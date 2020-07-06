import express from 'express';
import {
  handleValidation, validateNumber, validateRequired
} from '../middleware/validatorHelpers';
import { CommonModelController } from '../controllers/commonModelController';

const router = express.Router();

router.get(
  '/:id',
  (req, res, next) => {
    res.locals = +req.params.id;
    next();
  },
  CommonModelController.getAll,
);

router.post(
  '/',
  [validateNumber('ailment_id'), validateRequired('usage'), validateRequired('product_code')],
  handleValidation,
  CommonModelController.create,
);

router.patch(
  '/',
  [validateRequired('usage'), validateRequired('product_code'), validateRequired('id')],
  handleValidation,
  CommonModelController.update,
);

router.delete(
  '/',
  [validateNumber('id')],
  CommonModelController.delete,
);

export default router;
