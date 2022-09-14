import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

let server;
mongoose.connect(config.mongodbUri).then(() => {
  server = app.listen(config.port, () => {
    logger.info('==================================');
    logger.info(`======== ENV: ${config.env} ========`);
    logger.info(`🚀 App listening on the port ${config.port}`);
    logger.info('====== Connected to MongoDB ======');
    logger.info('==================================');
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.warn('==================================');
      logger.warn('🛑 App stopped');
      logger.warn('==================================');
    });
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (server) {
    logger.warn('==================================');
    logger.warn('🛑 App stopped. SIGTERM received');
    logger.warn('==================================');
    server.close();
  }
});