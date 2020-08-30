import express from 'express';
import {
  validateRequired, handleValidation, validateOptionalUrl, validateNumber
} from '../middleware/validatorHelpers';
import { CommonModelController } from '../controllers/commonModelController';
import { AilmentController } from '../controllers/ailmentController';
import { filterCommonQuery } from '../middleware/filters';

const router = express.Router();

const raw = (req, res, next) => {
  res.locals.raw = true;
  next();
};

router.get(
  '/raw',
  filterCommonQuery,
  raw,
  AilmentController.getAll
);

router.get(
  '/',
  filterCommonQuery,
  AilmentController.getAll
);

router.post(
  '/',
  [validateRequired('title'), validateOptionalUrl('external_url')],
  handleValidation,
  AilmentController.create,
  raw,
  AilmentController.getAll,
);

router.delete(
  '/',
  [validateNumber('id')],
  CommonModelController.delete,
);

export default router;
