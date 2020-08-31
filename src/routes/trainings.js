import express from 'express';
import {
  validateRequired, handleValidation, validateOptional, validateNumber, setModel
} from '../middleware/validatorHelpers';
import { validateToken, validateEditor } from '../middleware/authenticate';
import { TrainingController } from '../controllers/trainingController';
import { CommonModelController } from '../controllers/commonModelController';
import { filterCommonQuery } from '../middleware/filters';
import models from '../database/models';

const router = express.Router();

// Get all trainings include replies count
router.get(
  '/',
  validateToken,
  setModel('Training'),
  (req, res, next) => {
    res.locals.include = [{
      model: models.User,
      as: 'user',
      required: true,
      attributes: ['level', 'first_name', 'last_name', 'image_url']
    }];
    next();
  },
  filterCommonQuery,
  CommonModelController.getAll
);

// [DONE] Create Training
router.post(
  '/',
  validateToken,
  validateEditor,
  [
    validateRequired('title'),
    validateRequired('description'),
    validateOptional('body'),
    validateOptional('image_url'),
    validateOptional('video_code'),
    validateRequired('category'),
  ],
  handleValidation,
  TrainingController.createTraining,
);

// [DONE] Update Training
router.patch(
  '/',
  validateToken,
  validateEditor,
  [
    validateNumber('id'),
    validateRequired('title'),
    validateOptional('body'),
    validateRequired('description'),
    validateOptional('image_url'),
    validateOptional('video_code'),
    validateRequired('category'),
  ],
  handleValidation,
  TrainingController.updateTraining,
);

// [DONE] Update Training Views
router.patch(
  '/views',
  validateToken,
  [validateNumber('id')],
  handleValidation,
  TrainingController.updateViews,
);

// [DONE] Delete Training
router.delete(
  '/',
  validateToken,
  [validateNumber('id')],
  handleValidation,
  TrainingController.deleteTraining,
);

export default router;
