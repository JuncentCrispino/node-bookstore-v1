import mongoose from 'mongoose';
import paginate from './plugins/paginate.plugin.js';

const categorySchema = new mongoose.Schema({
  name: String
});

categorySchema.plugin(paginate);

const Category = mongoose.model('Category', categorySchema);

export default Category;
