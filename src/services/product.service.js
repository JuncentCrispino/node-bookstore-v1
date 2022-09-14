import httpStatus from 'http-status';
import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';
import pick from '../utils/pick.js';

export const newProduct = async (newProduct) => {
  if (await Product.isCreateProductNameTaken(newProduct.title)) {
    throw new ApiError(httpStatus.CONFLICT, 'Product name already taken');
  }
  const product = await Product.create(newProduct);
  return product;
};

export const updatedProduct = async (productId, productUpdate, session) => {
  session = session || null;
  if (await Product.isUpdateProductNameTaken(productId, productUpdate.productName)) {
    throw new ApiError(httpStatus.CONFLICT, 'Product name already taken');
  }
  if (await Product.isUpdateSkuTaken(productId, productUpdate.SKU)) {
    throw new ApiError(httpStatus.CONFLICT, 'SKU already taken');
  }
  const product = await Product.findByIdAndUpdate(productId, productUpdate, { session, new: true });
  return product;
};

export const productStatus = async (productId, isActive) => {
  const status = await Product.findByIdAndUpdate(productId, { isActive }, { new: true });
  return status;
};

export async function allProducts(filter, options) {
  const products = await Product.search(filter, options);
  return products;
}

export const findProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

export const bulkUpdateProducts = async (products, session) => {
  session = session || null;
  const updatedProducts = await Product.bulkWrite(products, { session });
  return updatedProducts;
};

export const getProductFilter = (searchText, isActive, category) => {
  let filter = [];
  //empty search text and admin
  if (!searchText && !isActive) {
    filter = [];
  }
  //empty search text and not admin
  if (!searchText && isActive) {
    filter.push({
      $match: {
        isActive,
        ...(category) && { category }
      }
    });
  }
  //non empty search text and admin
  if (searchText && !isActive) {
    filter.push(
      {
        $search: {
          index: 'bookIndex',
          text: {
            query: searchText,
            path: {
              wildcard: '*'
            }
          }
        }
      }
    );
  }
  //non empty search text and admin
  if (searchText && isActive) {
    filter.push(
      {
        $search: {
          index: 'bookIndex',
          text: {
            query: searchText,
            path: {
              wildcard: '*'
            }
          }
        }
      },
      {
        $match: {
          isActive,
          ...(category) && { category }
        }
      }
    );
  }
  console.log(filter);
  return filter;
};

export const findCategories = async (searchText, query) => {
  const filter = {
    ...(searchText) && { name: searchText }
  };
  const optons = pick(query, ['sortBy', 'limit', 'page']);
  const categories = await Category.paginate(filter, optons);
  return categories;
};
