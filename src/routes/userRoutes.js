import express from 'express';
import {
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController
} from '../controllers/userController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import { validate, userSchema } from '../utils/validator.js';

const router = express.Router();

router.use(authMiddleware, adminMiddleware);
router.post('/', validate(userSchema), createUserController);
router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.put('/:id', validate(userSchema), updateUserController);
router.delete('/:id', deleteUserController);

export default router;