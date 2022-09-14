import mongoose from 'mongoose';
import paginate from './plugins/paginate.plugin.js';
import toJSON from './plugins/toJSON.plugin.js';
import search from './plugins/search.plugin.js';
import { compare, hash } from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    private: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    trim: true,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  mobileNo: {
    unique: true,
    index: true,
    type: String,
    required: true
  },
  isMobileNoVerified: {
    type: Boolean,
    default: false
  },
  birthday: {
    type: String
  },
  gender: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  address: {
    unit: {
      type: String
    },
    building: {
      type: String
    },
    houseNo: {
      type: String
    },
    street: {
      type: String
    },
    brgy: {
      type: String
    },
    city: {
      type: String
    }
  },
  orders: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order'
    }
  ],
  reviews: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Review'
    }
  ]
}, {
  timestamps: true
});

// plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(search);
userSchema.plugin(paginate);

// check if email exist
userSchema.statics.isEmailTaken = async function (email, userId) {
  const user = await this.findOne({ email, _id: { $ne: mongoose.Types.ObjectId(userId) } }).exec();
  return !!user;
};

// check if user name exist
userSchema.statics.isUserNameTaken = async function (userName, userId) {
  const user = await this.findOne({ userName, _id: { $ne: mongoose.Types.ObjectId(userId) } }).exec();
  return !!user;
};

// check if mobile Number exist
userSchema.statics.isMobileNoTaken = async function (mobileNo, userId) {
  const user = await this.findOne({ mobileNo, _id: { $ne: mongoose.Types.ObjectId(userId) } }).exec();
  return !!user;
};

// check if password match the user's password
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 10);
  }
  next;
});

const User = mongoose.model('User', userSchema);
export default User;
