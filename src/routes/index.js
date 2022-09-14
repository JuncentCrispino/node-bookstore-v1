import express from 'express';
import { authRoute } from './auth.routes.js';
import { userRoute } from './user.routes.js';
import { productRoute } from './product.routes.js';
import { orderRoute } from './order.routes.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/user',
    route: userRoute
  },
  {
    path: '/product',
    route: productRoute
  },
  {
    path: '/order',
    route: orderRoute
  }
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;