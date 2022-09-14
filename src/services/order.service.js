import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const placeOrder = async (newOrder, session) => {
  session = session || null;
  const order = new Order(newOrder).save({ session });
  return order;
};

export const findOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

export const subTotal = async (orderItems) => {
  return await Promise.all(orderItems.map(async (item) => {
    const product = await Product.findById(item.productId);
    item.subTotal = product.price * item.qty;
    return item;
  }
  ));
};

export const totalOrderPrice = async (order) => {
  order.totalOrderPrice = order.orderItems.reduce((acc, item) => {
    return acc + item.subTotal;
  }, 0);
  return order;
};