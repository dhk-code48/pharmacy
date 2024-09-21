import Redis from "ioredis";

// Extend the global object to include the Redis instance
declare global {
  // eslint-disable-next-line no-var
  var redis: Redis | undefined;
}

let redis: Redis;

// Initialize PrismaClient
if (process.env.NODE_ENV === "production") {
  redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : new Redis();
} else {
  if (!global.redis) {
    global.redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : new Redis();
  }
  redis = global.redis;
}

export { redis };
