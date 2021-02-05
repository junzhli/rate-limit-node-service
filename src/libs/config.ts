import { IRedisConfigOptions } from "./types/redis";

export const RedisConfig: IRedisConfigOptions = {
    port: Number(process.env.REDIS_HOST) || undefined,
    host: process.env.REDIS_HOST || undefined,
    url: process.env.REDIS_URL || undefined,
};

export const RequestLimitPerMinute: number = Number(process.env.REQUEST_LIMIT_PER_MINUTE) || 60;
