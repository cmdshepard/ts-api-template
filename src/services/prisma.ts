import Prisma from "@prisma/client";
import logger from "./logger";

const prisma = new Prisma.PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e: Prisma.Prisma.QueryEvent) => logger.info(`[Query]: ${e.query} (${e.duration}ms)`));

prisma.$on("error", logger.error);

prisma.$on("info", logger.info);

prisma.$on("warn", logger.warn);

export const testConnection = async (): Promise<void> => {
  logger.info("Attempting to connect to the database...");

  try {
    await prisma.$connect();
    logger.info("Successfully connected to the database");
  } catch (e) {
    logger.error("Failed to open connection to the database");
    throw e;
  }
};

export default prisma;
