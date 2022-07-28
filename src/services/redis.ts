import IORedis from "ioredis";
import logger from "./logger";

const redis = new IORedis(process.env.REDIS_URL as string, {
  keepAlive: 10000,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy: times => Math.min(times * 500, 5000),
});

redis.setMaxListeners(50);

redis.on("connect", () => logger.info("Redis connected"));

redis.on("ready", () => logger.info("Redis ready"));

redis.on("error", e => {
  logger.error("Redis error:");
  logger.error(e);
});

redis.on("close", () => logger.warn("Redis connection closed"));

redis.on("reconnecting", () => logger.warn("Redis reconnecting..."));

redis.on("end", () => logger.error("Redis reconnection attempts failed and ended"));

export default redis;
