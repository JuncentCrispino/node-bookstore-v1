import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { findOrders, placeOrder, subTotal, totalOrderPrice } from '../services/order.service.js';
import { capturePayment, paypalOrder } from '../services/paypal.service.js';
import { bulkUpdateProducts, findProductById } from '../services/product.service.js';
import { updateUser } from '../services/user.service.js';
import { decodeJwt } from '../middlewares/auth.middleware.js';
import catchAsync from '../utils/CatchAsync.js';
import pick from '../utils/pick.js';

export const createOrder = async (req, res, next) => {
  let { orderItems } = req.body;
  await Promise.all(orderItems.map(async item => {
    await findProductById(item.productId);
  }));
  orderItems.push({
    productId: 'shippingFee',
    productName: 'shippingFee',
    price: 100 ,
    qty: 1
  });
  const data = await paypalOrder(orderItems);
  return res.status(httpStatus.OK).json(data);
};

export const captureOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { userId } = decodeJwt(req.headers.authorization);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let newOrder = req.body;
    newOrder.customerId = userId;
    await subTotal(newOrder.orderItems);
    await totalOrderPrice(newOrder);
    const productBulkUpdate = newOrder.orderItems.map(item => {
      return {
        updateOne: {
          filter: {
            _id: item.productId
          },
          update: {
            $inc: {
              sold: item.qty,
              availableStock: -item.qty
            }
          }
        }
      };
    });
    const [order] = await Promise.all([
      placeOrder(newOrder, session),
      capturePayment(orderId),
      bulkUpdateProducts(productBulkUpdate, session)
    ]);

    const user = await updateUser(userId, { $push: { orders: order._id } }, session);
    await session.commitTransaction();
    return res.status(httpStatus.OK).json({ order, user });
  } catch (error) {
    console.log(error)
    await session.abortTransaction();
    return next(error);
  } finally {
    await session.endSession();
  }
};

export const getOrders = catchAsync(async (req, res) => {
  const user = decodeJwt(req.headers.authorization);
  const filter = {
    ...(user.isAdmin === false) && { customerId: user.userId },
    ...(req.query.status) && { status: req.query.status }
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const orders = await findOrders(filter, options);
  return res.status(httpStatus.OK).json(orders);
});
