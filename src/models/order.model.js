import mongoose from 'mongoose';
import paginate from './plugins/paginate.plugin.js';
import search from './plugins/search.plugin.js';
import toJSON from './plugins/toJSON.plugin.js';

const orderSchema = new mongoose.Schema({
  paypalOrderId: {
    type: String
  },
  customerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  user: {
    firstName: {
      type: String,
      require: true
    },
    lastName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    email: {
      type: String
    },
    mobileNo: {
      type: String,
      required:  true
    }
  },
  shippingAddress: {
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
      type: String,
      required: true
    },
    barangay: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    }
  },
  orderItems: [
    {
      productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      subTotal: {
        type: Number,
        required: true
      }
    }
  ],
  totalOrderPrice: {
    type: Number,
    requried: true
  },
  totalOrderDiscount: {
    type: Number
  },
  deliveryFee: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false,
    required: true
  },
  paidAt: {
    type: Date
  },
  deliveryStatus: {
    type: String,
    index: true,
    required: true
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});

orderSchema.plugin(toJSON);
orderSchema.plugin(search);
orderSchema.plugin(paginate);

const Order = mongoose.model('Order', orderSchema);
export default Order;