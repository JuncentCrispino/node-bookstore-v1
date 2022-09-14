import httpStatus from 'http-status';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const findUserById = async (id) => {
  return User.findById(id);
};

export const createUser = async (userBody, session) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exist');
  }
  if (await User.isMobileNoTaken(userBody.mobileNo)) {
    throw new ApiError(httpStatus.CONFLICT, 'Mobile Number already exist');
  }
  const user = new User(userBody);
  await user.save({ session });
  return user;
};

export const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user || !user.isPasswordMatch(password)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email or Password is incorrect');
  }
  return user;
};

export const updateUser = async (userId, update, session) => {
  session = session || null;
  if (await User.isEmailTaken(userId, update.email)) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exist');
  }
  if (await User.isMobileNoTaken(userId, update.mobileNo)) {
    throw new ApiError(httpStatus.CONFLICT, 'Mobile Number already exist');
  }
  const user = await User.findByIdAndUpdate(userId, update, { session, new: true });
  return user;
};