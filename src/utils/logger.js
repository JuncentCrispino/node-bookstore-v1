import { existsSync, mkdirSync } from 'fs';
import path, { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import config from '../config/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = join(__dirname, config.logDir);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  const isDevelopment = config.env === 'development';
  return isDevelopment
    ? 'debug'
    : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
  verbose: 'cyan',
  silly: 'gray',
  custom: 'blue'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  winston.format.colorize({ level: true, message: true })
);

const transports = [
  new winston.transports.Console({ format }),
  new winstonDaily({
    level: 'debug',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/debug',
    filename: '%DATE%.log',
    maxFiles: 30,
    json: false,
    zippedArchive: true
  }),
  new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/error',
    filename: '%DATE%.log',
    maxFiles: 30,
    handleExceptions: true,
    json: false,
    zippedArchive: true
  })
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports

});
export default logger;
