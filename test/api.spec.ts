import httpStatusCode from "http-status-codes";
import supertest from "supertest";
import app from "../src/app";
import {REQUESTS_LIMIT_PER_IP} from "../src/libs/rateLimiter";
import redis from "../src/libs/redis";

const HEADER_CONTENT_TYPE = "application/json; charset=utf-8";

describe("integration testings", () => {
    beforeAll((done) => {
        setTimeout(async () => {
            if (!redis.client.connected) {
                throw new Error("redis connection is not ready");
            }

            await redis.flushall();

            done();
        }, 2000); // await the connection created
    });
    
    afterAll(() => {
        return new Promise<void>(async (res, rej) => {
            try {
                await redis.close();
                res();
            } catch (error) {
                rej(error);
            }
        });
    });
    
    describe("Rate limiter api", () => {
        let visits = 0;
    
        beforeAll(() => {
            testSession = supertest.agent(app);
        });

        test("it should be ok to respond successful state with quota used", async () => {
            for (let i = 0; i < REQUESTS_LIMIT_PER_IP; i++) {
                const response = await supertest(app)
                    .get("/rate");

                expect(response.status).toBe(httpStatusCode.OK);
                expect(response.headers["content-type"]).toBe(HEADER_CONTENT_TYPE);
                expect(typeof response.body).toBe("object");
                expect(response.body.visits).toEqual(++visits);
            }
        });

        test("it should be ok to respond too many request state with error message", async () => {
            for (let i = 0; i < REQUESTS_LIMIT_PER_IP; i++) {
                const response = await supertest(app)
                    .get("/rate");

                expect(response.status).toBe(httpStatusCode.TOO_MANY_REQUESTS);
                expect(response.headers["content-type"]).toBe(HEADER_CONTENT_TYPE);
                expect(typeof response.body).toBe("object");
                expect(response.body.error).toEqual("user visit limit exceeded");
            }
        });
    });
});