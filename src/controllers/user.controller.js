import httpStatus from 'http-status';
import { decodeJwt } from '../middlewares/auth.middleware.js';
import { findUserById, updateUser } from '../services/user.service.js';
import catchAsync from '../utils/CatchAsync.js';

export const getUserDetails = catchAsync(async (req, res) => {
  const creator = decodeJwt(req.headers.authorization);
  const user = await findUserById(creator.userId);
  return res.status(httpStatus.OK).json(user);
});

export const updateUserDetails = catchAsync(async (req, res) => {
  const { userId } = decodeJwt(req.headers.authorization);
  const user = await updateUser(userId, req.body);
  return res.status(httpStatus.OK).json(user);
});
