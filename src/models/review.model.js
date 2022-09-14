import { Schema, SchemaTypes, model } from 'mongoose';
import paginate from './plugins/paginate.plugin.js';
import toJSON from './plugins/toJSON.plugin.js';

const reviewSchema = new Schema({
  orderId : {
    type: SchemaTypes.ObjectId,
    ref: 'Order',
    index: true,
    required: true
  },
  productId: {
    type: SchemaTypes.ObjectId,
    ref: 'Product',
    index: true,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  reviewText: {
    type: String
  }
}, {
  timestamps: true
});

reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);

export default model('Reveiw', reviewSchema);