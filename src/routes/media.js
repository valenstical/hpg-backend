import express from 'express';
import {
  validateRequired, handleValidation, validateNumber, validateUrl,
} from '../middleware/validatorHelpers';
import { validateToken, validateAdmin } from '../middleware/authenticate';
import { CommonModelController } from '../controllers/commonModelController';
import { filterCommonQuery } from '../middleware/filters';
import { MediaController } from '../controllers/mediaController';

const router = express.Router();

router.get(
  '/',
  validateToken,
  filterCommonQuery,
  CommonModelController.getAll
);

router.get(
  '/count',
  validateToken,
  MediaController.count,
);

router.post(
  '/',
  validateToken,
  validateAdmin,
  [validateRequired('title'), validateRequired('type'), validateUrl('file_url', 'A valid file url is required')],
  handleValidation,
  CommonModelController.create,
);

router.patch(
  '/',
  validateToken,
  validateAdmin,
  [validateRequired('title'), validateRequired('type'), validateUrl('file_url', 'A valid file url is required'), validateNumber('id')],
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
