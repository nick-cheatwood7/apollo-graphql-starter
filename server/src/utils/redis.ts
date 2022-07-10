import Redis from "ioredis";
import { REDIS_URL, __prod__ } from "./constants";

declare global {
    var redis: Redis | undefined;
}

export const redis = global.redis || new Redis(REDIS_URL);

if (!__prod__) {
    global.redis = redis;
}
