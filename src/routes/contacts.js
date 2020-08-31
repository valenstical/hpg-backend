import express from 'express';
import {
  validateRequired, handleValidation, validateNumber, setRedirect
} from '../middleware/validatorHelpers';
import { validateToken } from '../middleware/authenticate';
import { CommonModelController } from '../controllers/commonModelController';
import { filterCommonQuery } from '../middleware/filters';
import { ContactsController } from '../controllers/contactsController';
import { searchByFboId, addFboIdToBody } from '../middleware/misc';
import { valueFromToken } from '../helpers/utils';

const router = express.Router();

router.get(
  '/',
  validateToken,
  setRedirect,
  filterCommonQuery,
  searchByFboId,
  CommonModelController.getAll,
  ContactsController.get,
);

router.post(
  '/',
  [
    validateNumber('user_code'),
    validateRequired('name'),
  ],
  handleValidation,
  addFboIdToBody,
  CommonModelController.create,
);

router.patch(
  '/',
  validateToken,
  [
    validateNumber('id'),
    validateRequired('name'),
  ],
  handleValidation,
  (req, res, next) => {
    const user = valueFromToken('user', res);
    res.locals.where = { fbo_id: user.fbo_id };
    next();
  },
  CommonModelController.update,
);

router.delete(
  '/',
  validateToken,
  [validateNumber('id')],
  handleValidation,
  CommonModelController.delete,
);

export default router;
