import mailer from 'nodemailer';
import config from '../config/index.js';
import verifyEmail from '../html/email/verify.emaill.js';
import { createNewToken } from './token.service.js';
import tokenTypes from '../config/token.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import Token from '../models/token.model.js';
import confirmEmail from '../html/email/confirm.email.js';
import resetPassword from '../html/email/resetPassword.email.js';
export const transport = mailer.createTransport({
  host: config.mailHost,
  port: config.mailPort,
  auth: {
    user: config.mailUser,
    pass: config.mailPassword
  }
});

export const sendEmail = async (email, subject, emailTemaplate) => {
  const message = {
    to: email,
    from: config.mailUser,
    subject,
    html: emailTemaplate
  };
  return await transport.sendMail(message);
};

export const generateVerifyEmail = async (user, hashToken, token, session) => {
  const link = `${config.appDomain}/verify-email?token=${token}&userId=${user._id}`;
  const emailTemaplate = verifyEmail(user.firstName, link);
  await Promise.all([
    createNewToken(user, hashToken, tokenTypes.VERIFY_EMAIL, config.jwt.verifyMailExpirationMins, session),
    sendEmail(user.email, 'verify your email', emailTemaplate)
  ]);
};

export const generateConfirmedEmail = async (userDoc) => {
  const emailTemplate = confirmEmail(userDoc.firstName);
  return await sendEmail(userDoc.email, 'Successfully Confirmed Email', emailTemplate);
};

export const generateSuccessfullResetPassword = async (userDoc) => {
  const emailTemplate = resetPassword(userDoc.firstName);
  return await sendEmail(userDoc.email, 'Successfully Reset Password', emailTemplate);
};
