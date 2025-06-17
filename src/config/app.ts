import cors from "cors";
import express from "express";
import http, { Server } from "http";
import { DateTime } from "luxon";
import morgan from "morgan";
import health from "../services/health";
import logger from "../services/logger";
import { testConnection } from "../services/prisma";

const app = express();
const port = Number(process.env.PORT || 8080);

app.set("x-powered-by", false);
app.set("trust proxy", true);
app.use(cors({ maxAge: 7200 }));
app.use(express.json());

morgan.token("ts", () => {
  const dt = DateTime.now();
  return `${dt.toLocaleString()} ${dt.toLocaleString(DateTime.TIME_WITH_SECONDS)} ${dt.offsetNameShort}`;
});

app.use(morgan(":ts [res] :method :url :status - :response-time ms"));

const server: Server = http.createServer(app);

export const startServer = async (): Promise<void> => {
  await Promise.all([
    testConnection(),
  ]).then(() => {
    server.listen(port);

    health.isLive = true;
    health.isReady = true;

    logger.info(`Server listening on port ${port}`);
  }).catch((e: any) => {
    logger.error(e);
    process.exit(1);
  });
};

startServer().catch((e: any) => {
  console.error(e);
  process.exit(1);
});

export default app;
