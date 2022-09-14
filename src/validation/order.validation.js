import Joi from 'joi';

export const newOrderSchema = {
  body: Joi.object().keys({
    user: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      middleName: Joi.string(),
      email: Joi.string(),
      mobileNo: Joi.string().required()
    }),
    shippingAddress: Joi.object().keys({
      unit: Joi.string(),
      building: Joi.string(),
      houseNo: Joi.string(),
      street: Joi.string().required(),
      brgy: Joi.string().required(),
      city: Joi.string().required()
    }),
    orderItems: Joi.array().items(
      Joi.object().keys({
        productId: Joi.string().required(),
        productName: Joi.string().required(),
        variation: Joi.string().required(),
        qty: Joi.number().required()
      })
    ),
    deliveryFee: Joi.number().required(),
    isPaid: Joi.boolean().required(),
    paidAt: Joi.date(),
    deliveryStatus: Joi.string().required(),
    deliveredAt: Joi.date()
  })
};