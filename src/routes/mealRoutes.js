import express from 'express';
import { getMealsByTypeController } from '../controllers/mealController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate, mealQuerySchema } from '../utils/validator.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', validate(mealQuerySchema), getMealsByTypeController);

export default router;