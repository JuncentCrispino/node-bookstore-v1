import mongoose from 'mongoose';
import toJSON from './plugins/toJSON.plugin.js';
import tokenTypes from '../config/token.js';

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    index: true,
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.UPDATE_PASSWORD, tokenTypes.VERIFY_EMAIL, tokenTypes.UPDATE_MOBILE],
    required: true
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

tokenSchema.index(
  {
    expireAt: 1
  },
  {
    expireAfterSeconds: 0
  }
);

tokenSchema.plugin(toJSON);

const Token = mongoose.model('Token', tokenSchema);

export default Token;