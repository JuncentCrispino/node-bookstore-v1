import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import mongoSanitize from 'express-mongo-sanitize';
import router from './routes/index.js';
import ApiError from './utils/ApiError.js';
import morganMiddleware from './middlewares/morgan.middleware.js';
import { errorConverter, errorHandler } from './middlewares/error.middleware.js';

//Initialize express app
const app = express();
//declare middlewares
app.use(morganMiddleware);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(compression());
app.use(cors({
  origin: ['http://store.centapps.online/', 'https://store.centapps.online/']
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