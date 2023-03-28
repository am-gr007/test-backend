const winston = require("winston");

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === "info" ? info : "false";
});

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  level: process.env.LOG_LEVEL || "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "combined_logs.log",
      level: "info",
      format: winston.format.combine(
        infoFilter(),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: "errors.log",
      level: "error",
      format: winston.format.combine(
        errorFilter(),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

const errorLogger = winston.createLogger({
  levels: winston.config.syslog.levels,
  level: "error",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.prettyPrint(),
  ),
  transports: [new winston.transports.Console()],
});

module.exports = {logger, errorLogger};
