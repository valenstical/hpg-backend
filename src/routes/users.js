import express from 'express';
import {
  validateRequired, handleValidation, validateOptional, validateEmail, validateUrl
} from '../middleware/validatorHelpers';
import { UserModelController } from '../controllers/userModelController';
import { validateToken, validateFBO } from '../middleware/authenticate';

const router = express.Router();

// [DONE] Get single user
router.get(
  '/',
  validateFBO,
  validateToken,
  UserModelController.getUser
);

// [DONE] Get active cc status
router.get(
  '/status',
  validateFBO,
  validateToken,
  UserModelController.getStatus
);

// [DONE] Ge all activations. Needs fbo id. Returns activation with user details.
// Tells if can activate or not with message
router.get(
  '/activations',
  validateFBO,
  UserModelController.getActivations,
);

// [DONE] Verify user using FLP360. Needs, fbo id, country . Returns user details from FLP360
router.post(
  '/verify',
  validateFBO,
  [validateRequired('fbo_id'), validateRequired('country_code')],
  handleValidation,
  UserModelController.verifyUser,
);

router.post(
  '/activate',
  validateFBO,
  [validateRequired('fbo_id'), validateEmail('email'), validateOptional('firebase_token')],
  handleValidation,
  UserModelController.activateUser,
);

router.post(
  '/',
  validateFBO,
  [
    validateEmail('email'),
    validateRequired('first_name'),
    validateRequired('fbo_id'),
    validateRequired('country_code'),
    validateOptional('firebase_token'),
    validateRequired('phone'),
    validateRequired('last_name'),
  ],
  handleValidation,
  UserModelController.verifyUser,
  UserModelController.createUser,
);

// [DONE] Update profile image
router.patch(
  '/image',
  validateFBO,
  validateToken,
  [validateUrl('image_url')],
  handleValidation,
  UserModelController.updateImage,
);

// [DONE] Update user profile
router.patch(
  '/profile',
  validateFBO,
  validateToken,
  [
    validateEmail('email'),
    validateRequired('first_name'),
    validateRequired('country_code'),
    validateOptional('state_code'),
    validateRequired('phone'),
    validateRequired('last_name'),
  ],
  handleValidation,
  UserModelController.updateProfile,
);

export default router;
