import redis, {RedisClient} from "redis";
import { RedisConfig } from "./config";
import logger from "./logger";
import { IRedis, IRedisConfigOptions } from "./types/redis";
import {promisify} from "util";

const log = logger("redis");

export const REDIS_NIL = "null";

class Redis implements IRedis {
    client: RedisClient;
    close: () => Promise<"OK">;
    flushall: () => Promise<unknown>;

    constructor({ 
        host = "127.0.0.1",
        port = 6379,
        url = "",
     }: IRedisConfigOptions) {
        this.client = (url) ? redis.createClient(url) : redis.createClient({ host, port });
        
        this.client.on("connect", () => {
            log.info("Redis connected");
        });
        this.client.on("error", err => {
            log.error("Error occurred in connection with Redis");
            log.log({
                level: "error",
                message: "",
                error: err
            });
        });
        this.client.on("reconnecting", () => {
            log.info("Redis reconnecting");
        });
        this.client.on("end", () => {
            log.info("Redis disconnected");
        });

        this.close = promisify(this.client.quit).bind(this.client);
        this.flushall = promisify(this.client.flushall).bind(this.client);
    }
}

export default new Redis(RedisConfig);
