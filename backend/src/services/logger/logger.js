import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  timestamp: true,
  defaultMeta: { service: "zenith-api", timestamp: new Date() },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
