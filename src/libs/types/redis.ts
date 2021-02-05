import { RedisClient } from "redis";

export interface IRedisConfigOptions {
    host?: string;
    port?: number;
    url?: string;
}

export interface IRedis {
    readonly client: RedisClient;
    close: () => Promise<"OK">;
    flushall: () => Promise<unknown>;
}