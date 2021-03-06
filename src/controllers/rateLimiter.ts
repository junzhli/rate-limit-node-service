import {getClientIp} from "@supercharge/request-ip";
import express from "express";
import httpStatusCode from "http-status-codes";
import logger from "../libs/logger";
import {getIPVisits, REQUESTS_LIMIT_PER_IP} from "../libs/rateLimiter";
import redis from "../libs/redis";
import {IErrorMessageResponseBody} from "./types";
import {IRateLimiterResponseBody} from "./types/rateLimiter";

const log = logger("rate-limiter-controller");

/**
 * rateLimiter serves status about request quota remaining
 */
const rateLimiter = async (req: express.Request,
                     res: express.Response,
                     next: express.NextFunction) => {
    try {
        const ip = getClientIp(req);
        if (!ip) {
            throw new Error("ip is undefined");
        }

        let visits: number;
        try {
            visits = Number(await getIPVisits(ip, redis));
        } catch (error) {
            log.error("unable to fetch ip visits");
            next(error);
            return;
        }

        if (visits > REQUESTS_LIMIT_PER_IP) {
            res.status(httpStatusCode.TOO_MANY_REQUESTS).json({
                error: "user visit limit exceeded"
            } as IErrorMessageResponseBody);
            return;
        }

        res.status(httpStatusCode.OK).json({
            visits
        } as IRateLimiterResponseBody);
    } catch (error) {
        next(error);
    }
};

export {
    rateLimiter
};