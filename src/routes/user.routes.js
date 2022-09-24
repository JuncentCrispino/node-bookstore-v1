import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/details', verifyJwt, getUserDetails);
router.put('/', verifyJwt, updateUserDetails);

export { router as userRoute };