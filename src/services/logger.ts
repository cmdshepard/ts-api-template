import { DateTime } from "luxon";
import winston from "winston";
const { colorize, combine, printf } = winston.format;

const formatter = printf(({ level,  message}) => {
  const dt = DateTime.now();
  const dateStr = `${dt.toLocaleString()} ${dt.toLocaleString(DateTime.TIME_WITH_SECONDS)} ${dt.offsetNameShort}`;

  if (typeof message === "object") {
    message = JSON.stringify(message, null, 2);
  }

  let result = `${dateStr} [${level}]`;

  result += `: ${message}`;
  return result;
});

const logger = winston.createLogger({
  format: combine(colorize(), formatter),
  transports: [
    new winston.transports.Console()
  ],
});

export default logger;
