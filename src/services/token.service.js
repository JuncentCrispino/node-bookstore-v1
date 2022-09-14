import dayjs from 'dayjs';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import tokenTypes from '../config/token.js';
import passwordResetEmail from '../html/email/requestResetPassword.email.js';
import Token from '../models/token.model.js';
import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import { findUserByEmail, findUserById } from './user.service.js';
import { sendEmail } from './email.service.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const generateToken = async (userId, email, isAdmin, expires, secret) => {
  const payload = {
    userId,
    email,
    isAdmin,
    iat: dayjs(Date.now()).unix(),
    exp: expires.unix()
  };
  return jwt.sign(payload, secret);
};

export const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, userId: payload.userId }).exec();
  if (!tokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }
  if (tokenDoc.blacklisted) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token blacklisted');
  }
  if (dayjs(tokenDoc.expireAt).isBefore(dayjs())) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired');
  }
  return tokenDoc;
};

export async function generateAccessToken(user) {
  const accessTokenExpires = dayjs(Date.now()).add(parseInt(config.jwt.accessExpirationMins), 'minutes');
  const access = await generateToken(user._id, user.email, user.isAdmin, accessTokenExpires, config.jwt.accessSecret);
  return access;
}

export async function generateRefreshToken(user) {
  const refreshTokenExpires = dayjs(Date.now()).add(parseInt(config.jwt.refreshExpirationMins), 'days');
  const refresh = await generateToken(user._id, user.email, user.isAdmin, refreshTokenExpires, config.jwt.refreshSecret);
  return refresh;
}

export async function createNewToken(user, hashToken, tokenType, expiration, session) {
  session = session || null;
  const token = new Token({
    userId: user._id,
    token: hashToken,
    type: tokenType,
    expireAt: dayjs(Date.now()).add(parseInt(expiration), 'minutes').toDate()
  });
  return await token.save({ session });
}

export const clearRefreshToken = async (token, tokenType) => {
  const refreshTokenDoc = await Token.deleteOne({ token, type: tokenType });
  console.log(refreshTokenDoc);
  if (refreshTokenDoc.deletedCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }
  logger.info(`Refresh token deleted for user ${refreshTokenDoc.userId}`);
  logger.info(`${refreshTokenDoc.deletedCount} token deleted`);
  return true;
};

export const generateAuthTokens = async (user, session) => {
  const refreshToken = await generateRefreshToken(user);
  const [accessToken] = await Promise.all([
    generateAccessToken(user),
    createNewToken(user, refreshToken, tokenTypes.REFRESH, config.jwt.refreshExpirationMins, session)
  ]);
  return { accessToken, refreshToken };
};
