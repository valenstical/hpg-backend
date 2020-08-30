import express from 'express';
import ailmentRouter from './ailments';
import productsRouter from './products';
import userRouter from './users';
import trainingRouter from './trainings';
import forumRouter from './forums';
import responseRouter from './responses';
import centerRouter from './centers';
import supportRouter from './supports';
import mediaRouter from './media';
import autolinksRouter from './autolinks';

import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';
import { setModel } from '../middleware/validatorHelpers';

const router = express.Router();

router.use('/ailments', ailmentRouter);
router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/trainings', trainingRouter);
router.use('/forums', forumRouter);
router.use('/responses', setModel('Response'), responseRouter);
router.use('/centers', setModel('Center'), centerRouter);
router.use('/supports', setModel('Support'), supportRouter);
router.use('/media', setModel('Media'), mediaRouter);
router.use('/autolinks', setModel('Autolink'), autolinksRouter);

router.all('*', (request, response) => {
  Response.send(response, STATUS.NOT_FOUND, null, MESSAGE.NOT_FOUND, false);
});

export default router;
