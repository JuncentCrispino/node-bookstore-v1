import httpStatus from 'http-status';
import config from '../config/index.js';
import tokenTypes from '../config/token.js';
import passwordResetEmail from '../html/email/requestResetPassword.email.js';
import Token from '../models/token.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { findUserByEmail, findUserById } from './user.service.js';
import { sendEmail } from './email.service.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { verifyToken, generateAccessToken, generateRefreshToken, createNewToken } from './token.service.js';

export async function refreshAuth(token) {
  const refreshTokenDoc = await verifyToken(token, tokenTypes.REFRESH);
  const user = await findUserById(refreshTokenDoc.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user),
    generateRefreshToken(user)
  ]);
  //
  await createNewToken(user, refreshToken, tokenTypes.REFRESH, config.jwt.refreshExpirationMins);
  return { accessToken, refreshToken };
}

export async function generateResetPasswordToken(email, ip) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await Token.deleteMany({ userId: user._id, type: tokenTypes.RESET_PASSWORD });

  let resetToken = crypto.randomBytes(32).toString('hex');
  const hashToken = await bcrypt.hash(resetToken, 10);

  const link = `${config.appDomain}/reset-password?token=${resetToken}&userId=${user._id}`;
  const emailTemplate = passwordResetEmail(email, user.firstName, ip, link);

  await Promise.all([
    createNewToken(user, hashToken, tokenTypes.RESET_PASSWORD, config.jwt.resetPasswordExpirationMins),
    sendEmail(email, 'reset password', emailTemplate)
  ]);

  return { message: 'Reset password link sent to your email' };
}

export const validateEmailToken = async (token, tokenType, userId, update) => {
  const [userDoc, tokenDoc] = await Promise.all([
    User.findById(userId),
    Token.findOne({ type: tokenType, userId })
  ]);
  if (!userDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!tokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid or expired password reset token.');
  }
  const isValid = bcrypt.compare(token, tokenDoc.token);
  if (!isValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired password reset token.');
  }
  Object.assign(userDoc, update);
  await Promise.all([
    userDoc.save(),
    tokenDoc.deleteOne()
  ]);
  return userDoc;
};