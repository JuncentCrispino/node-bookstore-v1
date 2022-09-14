import morgan from 'morgan';
import config from '../config/index.js';
import logger from '../utils/logger.js';

const stream = {
  write: (message) => logger.http(message.trim())
};

const morganMiddleware = morgan(config.logFormat,{ stream });

export default morganMiddleware;