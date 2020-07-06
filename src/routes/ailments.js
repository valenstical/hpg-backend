import express from 'express';
import {
  validateRequired, handleValidation, validateOptional, validateOptionalUrl, validateNumber
} from '../middleware/validatorHelpers';
import { CommonModelController } from '../controllers/commonModelController';
import { AilmentController } from '../controllers/ailmentController';
import { filterCommonQuery } from '../middleware/filters';

const router = express.Router();

router.get(
  '/raw',
  filterCommonQuery,
  (req, res, next) => {
    res.locals.raw = true;
    next();
  },
  AilmentController.getAll
);

router.get(
  '/',
  filterCommonQuery,
  AilmentController.getAll
);

router.post(
  '/',
  [validateRequired('title'), validateOptional('description'), validateOptional('instructions'), validateOptionalUrl('external_url')],
  handleValidation,
  AilmentController.create,
);

router.delete(
  '/',
  [validateNumber('id')],
  CommonModelController.delete,
);

export default router;
