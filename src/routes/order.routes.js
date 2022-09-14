import express from 'express';
import { createOrder, getOrders } from '../controllers/order.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { newOrderSchema } from '../validation/order.validation.js';

const router = express.Router();

router.post('/', verifyJwt ,validate(newOrderSchema), createOrder);
router.get('/', verifyJwt ,getOrders);

export { router as orderRoute };