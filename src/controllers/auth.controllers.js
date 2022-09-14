import httpStatus from 'http-status';
import { generateConfirmedEmail, generateVerifyEmail, generateSuccessfullResetPassword } from '../services/email.service.js';
import { clearRefreshToken, createNewToken, generateAccessToken, generateAuthTokens, generateRefreshToken } from '../services/token.service.js';
import { generateResetPasswordToken, refreshAuth, validateEmailToken } from '../services/auth.service.js';
import { createUser, loginUserWithEmailAndPassword } from '../services/user.service.js';
import { hash } from 'bcrypt';
import config from '../config/index.js';
import tokenTypes from '../config/token.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import catchAsync from '../utils/CatchAsync.js';
import { decodeJwt } from '../middlewares/auth.middleware.js';

export const register = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await createUser(req.body, session);
    const token = crypto.randomBytes(32).toString('hex');
    const hashToken = await hash(token, 10);
    const [accessToken, refreshToken] = await Promise.all([
      generateAuthTokens(user, session),
      generateVerifyEmail(user, hashToken, token, session)
    ]);
    await session.commitTransaction();
    return res.status(httpStatus.CREATED).json({ user, accessToken, refreshToken });
  } catch (error) {
    await session.abortTransaction();
    return next(error);
  } finally {
    await session.endSession();
  }
};

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserWithEmailAndPassword(email, password);
  const refreshToken = await generateRefreshToken(user);
  const [accessToken] = await Promise.all([
    generateAccessToken(user),
    createNewToken(user, refreshToken, tokenTypes.REFRESH, config.jwt.refreshExpirationMins)
  ]);
  return res.send({ accessToken, refreshToken, user });
});

export const logout = catchAsync(async (req, res) => {
  await clearRefreshToken(req.body.refreshToken, tokenTypes.REFRESH);
  return res.status(httpStatus.OK).send({ message: 'Logout Successful' });
});

export const refreshAccessToken = catchAsync(async (req, res) => {
  const token = await refreshAuth(req.headers.authorization);
  return res.send({ ...token });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const ip = req.ip;
  const email = req.body.email;
  const resetPassword = await generateResetPasswordToken(email, ip);
  return res.send(resetPassword);
});

export const confirmEmail = catchAsync(async (req, res) => {
  const { userId, token } = req.query;
  const userDoc = await validateEmailToken(token, tokenTypes.VERIFY_EMAIL, userId, { isEmailVerified: true });
  await generateConfirmedEmail(userDoc);
  return res.status(httpStatus.OK).send({ message: 'Email Confirmed' });
});

export const resetPassword = catchAsync(async (req, res) => {
  const { token, userId } = req.query;
  const { password } = req.body;
  const userDoc = await validateEmailToken(token, tokenTypes.RESET_PASSWORD, userId, { password });
  await generateSuccessfullResetPassword(userDoc);
  return res.status(httpStatus.OK).send({ message: 'Password Reset' });
});

export const verifyAccessToken = catchAsync(async (req, res) => {
  const creator = decodeJwt(req.headers.authorization);
  if (!creator) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  } else {
    return res.status(httpStatus.OK).send(creator);
  }
});

export const verifyAdmin = catchAsync(async (req, res) => {
  const creator = decodeJwt(req.headers.authorization);
  if (creator.isAdmin === true) {
    return res.sendStatus(httpStatus.OK);
  } else {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
});