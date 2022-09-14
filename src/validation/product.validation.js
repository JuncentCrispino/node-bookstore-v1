import Joi from 'joi';

export const productSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    subtitle: Joi.string().allow(null),
    authors: Joi.string().required(),
    price: Joi.number().required(),
    promoPrice: Joi.number().allow(null),
    category: Joi.string().required(),
    description: Joi.string(),
    images: Joi.array(),
    thumbnail: Joi.string(),
    availableStock: Joi.number().required(),
    pageNumber: Joi.number(),
    yearPublished: Joi.number(),
    isbn13: Joi.string(),
    isbn10: Joi.string(),
    sold: Joi.number(),
    reviews: Joi.array(),
    rating: Joi.number()
  })
};

export const statusSchema = {
  body: Joi.object().keys({
    isActive: Joi.boolean().required()
  }),
  params: Joi.object().keys({
    productId: Joi.string().required()
  })
};