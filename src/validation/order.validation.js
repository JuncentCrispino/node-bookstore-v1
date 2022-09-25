import Joi from 'joi';

export const newOrderSchema = {
  body: Joi.object().keys({
    user: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      middleName: Joi.string().allow(null),
      email: Joi.string().allow(null),
      mobileNo: Joi.string().required()
    }),
    shippingAddress: Joi.object().keys({
      unit: Joi.string().allow(null),
      building: Joi.string().allow(null),
      houseNo: Joi.string().allow(null),
      street: Joi.string().required(),
      barangay: Joi.string().required(),
      city: Joi.string().required(),
      region: Joi.string().required()
    }),
    orderItems: Joi.array().items(
      Joi.object().keys({
        productId: Joi.string().required(),
        productName: Joi.string().required(),
        price: Joi.number(),
        qty: Joi.number().required()
      })
    ),
    deliveryFee: Joi.number().required(),
    isPaid: Joi.boolean().required(),
    paidAt: Joi.date(),
    deliveryStatus: Joi.string().required(),
    deliveredAt: Joi.date(),
    paypalOrderId: Joi.string()
  })
};