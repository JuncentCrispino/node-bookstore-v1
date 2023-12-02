import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import mongoSanitize from 'express-mongo-sanitize';
import router from './routes/index.js';
import ApiError from './utils/ApiError.js';
import morgan from './middlewares/morgan.middleware.js';
import { errorConverter, errorHandler } from './middlewares/error.middleware.js';
import config from './config/index.js';

//Initialize express app
const app = express();
//declare middlewares
app.use(express.static('client'));
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(compression());
app.use(cors({
  origin: config.appDomain,
  ...(config.env === 'development') && { origin: 'http://localhost:3000' }
}));
//declare routes
app.get('/', (_req, res) => res.sendStatus(httpStatus.OK));
app.use('/v1', router);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route not found.'));
});
//declare error middlewares
app.use(errorConverter);
app.use(errorHandler);

export default app;