import express from 'express';
import { confirmEmail, forgotPassword, login, logout, refreshAccessToken, register, resetPassword, verifyAccessToken, verifyAdmin } from '../controllers/auth.controllers.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema, bodyTokenSchema, forgetPasswordSchema, confirmEmailScema, resetPasswordSchema } from '../validation/auth.validation.js';

const router = express.Router();

router.get('/verify-token', verifyJwt, verifyAccessToken);
router.get('/verify-admin', verifyJwt, verifyAdmin);
router.post('/sign-up', validate(registerSchema), register);
router.post('/sign-in', validate(loginSchema), login);
router.delete('/logout', verifyJwt, validate(bodyTokenSchema), logout);
router.get('/refresh-token', validate(bodyTokenSchema), refreshAccessToken);
router.post('/forgot-password', validate(forgetPasswordSchema), forgotPassword);
router.post('/confirm-email', validate(confirmEmailScema), confirmEmail);
router.put('/reset-password', validate(resetPasswordSchema), resetPassword);

export { router as authRoute };