import express from 'express';
import { getUserDetails } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/details', verifyJwt, getUserDetails);

export { router as userRoute };