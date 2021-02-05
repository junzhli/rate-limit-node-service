import {RequestLimitPerMinute} from "./config";
import {IRedis} from "./types/redis";


const luaScripts = {
    GET_IP_VISITS: "local v = redis.call('INCR', KEYS[1]);" +
        "if v == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end;" +
        "return v",
};

export const getIPVisits = (userIp: string, redis: IRedis) => {
    return new Promise((res, rej) => {
        redis.client.eval(luaScripts.GET_IP_VISITS,
            1, REDIS_KEY.IP_VISITS(userIp), REQUESTS_LIMIT_PER_IP.toString(), (error, data) => {
                if (error) {
                    rej(error);
                    return;
                }

                res(data);
            });
    });
};

export const REQUESTS_LIMIT_PER_IP = RequestLimitPerMinute;

export const REDIS_KEY = {
    IP_VISITS: (ip: string) => `ip-visits:${ip}`
};