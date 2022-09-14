import httpStatus from 'http-status';
import { decodeJwt } from '../middlewares/auth.middleware.js';
import Category from '../models/category.model.js';
import { allProducts, findProductById, getProductFilter, newProduct, productStatus, updatedProduct } from '../services/product.service.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/CatchAsync.js';
import pick from '../utils/pick.js';

export const addProduct = catchAsync(async (req, res) => {
  const creator = decodeJwt(req.headers.authorization);
  if (creator.isAdmin === false) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to perform this action.');
  }
  const createdProduct = await newProduct(req.body);
  return res.status(httpStatus.CREATED).json(createdProduct);
});

export const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const creator = decodeJwt(req.headers.authorization);
  if (creator.isAdmin === false) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to perform this action.');
  }
  const product = await updatedProduct(productId, req.body);
  return res.status(httpStatus.OK).json(product);
});

export const archiveProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const creator = decodeJwt(req.headers.authorization);
  if (creator.isAdmin === false) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to perform this action.');
  }
  const product = await productStatus(productId, req.body.isActive);
  return res.status(httpStatus.OK).json(product);
});

export const getProductById = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const product = await findProductById(productId);
  return res.status(httpStatus.OK).json(product);
});

export const getProducts = catchAsync(async (req, res) => {
  const { searchText, category } = req.query;
  let isActive = true;
  if (req.headers.authorization && decodeJwt(req.headers.authorization).isAdmin === true) {
    isActive = false;
  }
  const filter = getProductFilter(searchText, isActive, category);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const products = await allProducts(filter, options);
  return res.status(httpStatus.OK).json(products);
});

export const getProductCategory = catchAsync(async (req, res) => {
  const category = await Category.find().select('name').lean().exec();
  return res.status(httpStatus.OK).json(category);
});