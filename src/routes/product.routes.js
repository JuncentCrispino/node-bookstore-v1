import express from 'express';
import { addProduct, archiveProduct, getProductById, getProducts, updateProduct, getProductCategory } from '../controllers/product.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { productSchema, statusSchema } from '../validation/product.validation.js';

const router = express.Router();

router.get('/categories', getProductCategory);
router.get('/:productId', getProductById);
router.post('/', verifyJwt, validate(productSchema), addProduct);
router.get('/', getProducts);
router.patch('/:productId', verifyJwt, validate(statusSchema), archiveProduct);
router.put('/:productId', verifyJwt, validate(productSchema), updateProduct);

export { router as productRoute };