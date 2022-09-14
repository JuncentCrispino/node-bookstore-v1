import { Schema, model } from 'mongoose';
import toJSON from './plugins/toJSON.plugin.js';
import otpTypes from '../config/otpTypes.js';

const mobileOTP = Schema({
  mobileNo: {
    type: String,
    index: true,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  otpType: {
    type: String,
    enum: [otpTypes.SIGNUP_MOBILE_OTP, otpTypes.CONFIRM_ORDER_OTP]
  },
  expireAt: {
    type: Date,
    default: null,
    required: true
  },
  blacklisted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

mobileOTP.index(
  {
    expireAt: 1
  },
  {
    expireAfterSeconds: 0
  }
);

mobileOTP.plugin(toJSON);

export default model('MobileOTP', mobileOTP);