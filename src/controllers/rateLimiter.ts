import express from "express";
import redis from "../libs/redis";
import {getClientIp} from "@supercharge/request-ip";
import {getIPVisits, REQUESTS_LIMIT_PER_IP} from "../libs/rateLimiter";
import {RateLimiterResponseBody} from "./types/rateLimiter";
import logger from "../libs/logger";
import {ErrorMessageResponseBody} from "./types";
import httpStatusCode from "http-status-codes"

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
            } as ErrorMessageResponseBody);
            return;
        }

        res.status(httpStatusCode.OK).json({
            visits
        } as RateLimiterResponseBody);
    } catch (error) {
        next(error);
    }
}

export {
    rateLimiter
}