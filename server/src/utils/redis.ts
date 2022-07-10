import Redis from 'ioredis'
import { REDIS_URI, __prod__ } from './constants';

declare global {
  var redis: Redis | undefined;
}

export const redis = global.redis || new Redis(REDIS_URI)

if (!__prod__) {
  global.redis = redis
}