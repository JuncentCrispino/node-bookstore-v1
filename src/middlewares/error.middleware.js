import mongoose from 'mongoose';
import httpStatus from 'http-status';
import logger from '../utils/logger.js';
import ApiError from '../utils/ApiError.js';
import config from '../config/index.js';

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack })
  };
  logger.error(`[${req.method}][${req.path}] -> IP: ${req.ip} -> StatusCode:: ${statusCode} -> Message:: ${message}`);
  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };