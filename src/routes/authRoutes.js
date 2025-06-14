import express from 'express';
import { loginController, refreshTokenController } from '../controllers/authController.js';
import { loginRateLimiter } from '../middlewares/rateLimitMiddleware.js';
import { validate, loginSchema } from '../utils/validator.js';

const router = express.Router();

router.post('/login', loginRateLimiter, validate(loginSchema), loginController);
router.post('/refresh', refreshTokenController);

export default router;