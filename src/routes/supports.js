import express from 'express';
import {
  validateRequired, handleValidation, validateNumber
} from '../middleware/validatorHelpers';
import { validateToken, validateAdmin } from '../middleware/authenticate';
import { CommonModelController } from '../controllers/commonModelController';
import { filterCommonQuery } from '../middleware/filters';
import { Response } from '../helpers/utils';
import { STATUS } from '../helpers/constants';

const router = express.Router();

router.get(
  '/',
  validateToken,
  filterCommonQuery,
  CommonModelController.getAll
);

router.get(
  '/contact',
  validateToken,
  (req, res) => Response.send(res, STATUS.OK, {
    phone: '08130099132',
    email: 'support@hpgworldwide.org'
  })
);

router.post(
  '/',
  validateToken,
  validateAdmin,
  [validateRequired('title'), validateRequired('video_code')],
  handleValidation,
  CommonModelController.create,
);

router.patch(
  '/',
  validateToken,
  validateAdmin,
  [validateRequired('title'), validateRequired('video_code'), validateNumber('id')],
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
