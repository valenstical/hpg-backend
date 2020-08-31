import express from 'express';
import {
  validateRequired, handleValidation, validateNumber, setModel, validateOptional, validateEmail, validateOptionalEmail
} from '../middleware/validatorHelpers';
import { validateToken, validateAdmin } from '../middleware/authenticate';
import { CommonModelController } from '../controllers/commonModelController';
import { filterCommonQuery } from '../middleware/filters';

const router = express.Router();

router.get(
  '/',
  // validateToken,
  // filterCommonQuery,
  CommonModelController.seedData
);

router.post(
  '/',
  validateToken,
  validateAdmin,
  [validateRequired('title'), validateOptionalEmail('email'), validateOptional('events'), validateOptional('phone'), validateRequired('address')],
  handleValidation,
  CommonModelController.create,
);

router.patch(
  '/',
  validateToken,
  validateAdmin,
  [validateRequired('title'), validateOptionalEmail('email'), validateOptional('events'), validateOptional('phone'), validateRequired('address'), validateNumber('id')],
  handleValidation,
  CommonModelController.update,
);

router.delete(
  '/',
  validateToken,
  validateAdmin,
  [validateNumber('id')],
  handleValidation,
  CommonModelController.delete,
);

export default router;
