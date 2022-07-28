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

prisma.$on("query", e => logger.info(`[Query]: ${e.query} (${e.duration}ms)`));

prisma.$on("error", logger.error);

prisma.$on("info", logger.info);

prisma.$on("warn", logger.warn);

export const testConnection = async () => {
  logger.info("Attempting to connect to the database...");

  try {
    await prisma.$connect();
    logger.info("Successfully connected to the database");
  } catch (e) {
    logger.error("Failed to open connection to the database");
    throw e;
  }
};

// /**
//  * @param cursor {?*}
//  * @param take {?number}
//  * @param where {object}
//  * @param orderBy {?object}
//  * @returns {object}
//  */
// export const paginationQuery = ({
//                                   cursor,
//                                   take,
//                                   where,
//                                   orderBy,
//                                 }) => {
//   const query = {
//     where,
//     take: take || 10,
//     orderBy: orderBy || { id: "desc" },
//   };
//
//   if (cursor) {
//     query.cursor = { id: cursor };
//     query.skip = 1;
//   }
//
//   return query;
// };

export default prisma;
