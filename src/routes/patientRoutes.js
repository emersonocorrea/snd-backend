import express from 'express';
import {
  createPatientController,
  getPatientsController,
  getPatientByIdController,
  updatePatientController,
  deletePatientController
} from '../controllers/patientController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate, patientSchema } from '../utils/validator.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', validate(patientSchema), createPatientController);
router.get('/', getPatientsController);
router.get('/:id', getPatientByIdController);
router.put('/:id', validate(patientSchema), updatePatientController);
router.delete('/:id', deletePatientController);

export default router;