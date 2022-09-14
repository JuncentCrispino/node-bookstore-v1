import mongoose from 'mongoose';
import paginate from './plugins/paginate.plugin.js';
import toJSON from './plugins/toJSON.plugin.js';
import search from './plugins/search.plugin.js';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  authors: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    require: true
  },
  promoPrice: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  images: [String],
  thumbnail: {
    type: String
  },
  availableStock: {
    type: Number,
    default: 0,
    min: 0
  },
  pageNumber: {
    type: Number
  },
  yearPublished: {
    type: Number
  },
  isbn13: {
    type: String
  },
  isbn10: {
    type: String
  },
  sold: {
    type: Number,
    index: true,
    default: 0
  },
  reviews: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Reviews'
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

productSchema.plugin(toJSON);
productSchema.plugin(search);
productSchema.plugin(paginate);

productSchema.statics.isCreateProductNameTaken = async function (title) {
  const product = await this.findOne({ title }).exec();
  return !!product;
};

// productSchema.statics.isNewSkuTaken = async function (SKU) {
//   const product = await this.findOne({ SKU }).exec();
//   return !!product;
// };

// productSchema.statics.isUpdateSkuTaken = async function (productId, SKU) {
//   const product = await this.findOne({
//     _id: {
//       $ne: mongoose.Types.ObjectId(productId)
//     },
//     SKU
//   });
//   return !!product;
// };

productSchema.statics.isUpdateProductNameTaken = async function (productId, title) {
  const product = await this.findOne({
    _id: {
      $ne: mongoose.Types.ObjectId(productId)
    },
    title
  });
  return !!product;
};

const Product = mongoose.model('Product', productSchema);

export default Product;
