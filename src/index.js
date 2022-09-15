import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

let server;
mongoose.connect(config.mongodbUri).then(() => {
  server = app.listen(config.port, () => {
    console.log('==================================');
    console.log(`======== ENV: ${config.env} ========`);
    console.log(`🚀 App listening on the port ${config.port}`);
    console.log('====== Connected to MongoDB ======');
    console.log('==================================');
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('==================================');
      console.log('🛑 App stopped');
      console.log('==================================');
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
    console.log('==================================');
    console.log('🛑 App stopped. SIGTERM received');
    console.log('==================================');
    server.close();
  }
});