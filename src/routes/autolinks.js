import express from 'express';

import { validateToken } from '../middleware/authenticate';
import { CommonModelController } from '../controllers/commonModelController';
import { filterCommonQuery } from '../middleware/filters';
import { AutolinksController } from '../controllers/autolinksController';

const router = express.Router();

router.get(
  '/',
  validateToken,
  (req, res, next) => {
    res.locals.redirect = true;
    next();
  },
  filterCommonQuery,
  CommonModelController.getAll,
  AutolinksController.get,
);

export default router;
