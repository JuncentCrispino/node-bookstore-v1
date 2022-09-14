import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import config from '../config/index.js';

export const createAccessToken = ({ id, email }) => {
  const data = {
    id,
    email
  };
  return jwt.sign(data, config.jwt.secret, { expiresIn: '8h' });
};

export const verifyJwt = (req, res, next) => {
  let token = req.headers.authorization;
  if (typeof token !== 'undefined') {
    if (token.includes('Bearer ')) {
      token = token.substring(7, token.length);
    }
    return jwt.verify(token, config.jwt.accessSecret, (err) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired.');
        }
        throw new ApiError(httpStatus.FORBIDDEN, 'Authorization failed.');
      }
      next();
    });
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'No authorization token found.');
  }
};

export const decodeJwt = (token) => {
  if (typeof token !== 'undefined') {
    if (token.includes('Bearer ')) {
      token = token.substring(7, token.length);
    }
    return jwt.verify(token, config.jwt.accessSecret, (err) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired.');
        }
        throw new ApiError(httpStatus.FORBIDDEN, 'Authorization failed.');
      } else {
        return jwt.decode(token, { complete: true }).payload;
      }
    });
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'No authorization token found.');
  }
};