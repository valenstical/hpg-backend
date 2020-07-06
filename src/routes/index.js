import express from 'express';
import ailmentRouter from './ailments';
import productsRouter from './products';

import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';
import { setModel } from '../middleware/validatorHelpers';

const router = express.Router();

router.use('/ailments', setModel('Ailment'), ailmentRouter);
router.use('/products', setModel('Product'), productsRouter);

router.all('*', (request, response) => {
  Response.send(response, STATUS.NOT_FOUND, null, MESSAGE.NOT_FOUND, false);
});

export default router;
