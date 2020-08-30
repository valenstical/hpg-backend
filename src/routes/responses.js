import express from 'express';
import {
  validateRequired, handleValidation, validateNumber, setModel
} from '../middleware/validatorHelpers';
import { validateToken, validateAdmin } from '../middleware/authenticate';
import { CommonModelController } from '../controllers/commonModelController';
import { filterCommonQuery } from '../middleware/filters';

const router = express.Router();

router.get(
  '/',
  validateToken,
  filterCommonQuery,
  CommonModelController.getAll
);

router.post(
  '/',
  validateToken,
  validateAdmin,
  [validateRequired('title', 'Question is required'), validateRequired('response')],
  handleValidation,
  CommonModelController.create,
);

router.patch(
  '/',
  validateToken,
  validateAdmin,
  [validateRequired('title', 'Question is required'), validateRequired('response'), validateNumber('id')],
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
