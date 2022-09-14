import Joi from 'joi';

export const registerSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobileNo: Joi.string().required(),
    birthday: Joi.string(),
    gender: Joi.string()
  })
};

export const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

export const bodyTokenSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

export const forgetPasswordSchema = {
  body: Joi.object().keys({
    email: Joi.string().required()
  })
};

export const confirmEmailScema = {
  query: Joi.object().keys({
    userId: Joi.string().required(),
    token: Joi.string().required()
  })
};

export const resetPasswordSchema = {
  body: Joi.object().keys({
    password: Joi.string().min(8).required()
  }),
  query: Joi.object().keys({
    userId: Joi.string().required(),
    token: Joi.string().required()
  })
};