import httpStatus from 'http-status';
import { decodeJwt } from '../middlewares/auth.middleware.js';
import { findUserById } from '../services/user.service.js';
import catchAsync from '../utils/CatchAsync.js';

export const getUserDetails = catchAsync(async (req, res) => {
  const creator = decodeJwt(req.headers.authorization);
  console.log(creator);
  const user = await findUserById(creator.userId);
  console.log(user);
  return res.status(httpStatus.OK).json(user);
});
