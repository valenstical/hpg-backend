import express from 'express';
import {
  validateRequired, handleValidation, validateNumber, setModel
} from '../middleware/validatorHelpers';
import { validateToken } from '../middleware/authenticate';
import { CommonModelController } from '../controllers/commonModelController';
import { filterCommonQuery } from '../middleware/filters';
import models from '../database/models';
import { ForumController } from '../controllers/forumController';

const router = express.Router();

// Get all posts include replies count
router.get(
  '/',
  validateToken,
  setModel('Forum'),
  (req, res, next) => {
    res.locals.include = [
      {
        model: models.User,
        as: 'user',
        required: true,
        attributes: ['level', 'first_name', 'last_name', 'image_url']
      },
    ];

    next();
  },
  filterCommonQuery,
  CommonModelController.getAll
);

// Post a message
router.post(
  '/',
  validateToken,
  [validateRequired('title', 'Message is required')],
  handleValidation,
  ForumController.createPost,
);

// Reply a message
router.post(
  '/replies',
  validateToken,
  [validateRequired('title', 'Message is required'), validateNumber('forum_id')],
  handleValidation,
  ForumController.createReply,
);

// [DONE] Delete post
router.delete(
  '/',
  validateToken,
  [validateNumber('id')],
  handleValidation,
  ForumController.deletePost,
);

export default router;
