import express from 'express';
import { captureOrder, createOrder, getOrders } from '../controllers/order.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { newOrderSchema } from '../validation/order.validation.js';

const router = express.Router();

router.post('/', verifyJwt, createOrder);
router.post('/:orderId/capture', verifyJwt, captureOrder);
router.get('/', verifyJwt, getOrders);

export { router as orderRoute };