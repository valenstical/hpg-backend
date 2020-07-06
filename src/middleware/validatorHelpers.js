import { validationResult, body } from 'express-validator/check';
import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';

export const validateRequired = (field, message = `${field} is required`) => body(field)
  .trim()
  .not()
  .isEmpty()
  .withMessage(message);

export const validateOptional = (field, message = `Enter a valid ${field}`) => body(field)
  .trim()
  .optional()
  .not()
  .isEmpty()
  .withMessage(message);

export const validateOptionalUrl = (field, message = `Enter a valid ${field}`) => body(field)
  .optional()
  .trim()
  .isURL({ require_protocol: true })
  .withMessage(message);

export const validateOptionalBoolean = (field, message = `Enter a valid ${field}`) => body(field)
  .optional()
  .isBoolean()
  .withMessage(message);

export const validateEmpty = (field, message = `${field} is required`) => body(field)
  .not()
  .isEmpty()
  .withMessage(message);

export const validateNumber = (
  field,
  message = `${field} must be a valid number`,
) => body(field)
  .trim()
  .isInt()
  .withMessage(message);

export const validateOptionalNumber = (
  field,
  message = `${field} must be a 7 digit number`,
  min = 1000000,
  max = 9999999,
) => body(field)
  .trim()
  .optional()
  .isInt()
  .withMessage(message)
  .isInt({ min, max })
  .withMessage(message);

export const validateUrl = (field = 'url', message = 'Enter a valid url') => body(field)
  .trim()
  .isURL()
  .withMessage(message);

export const validateEmail = (field = 'email', message = 'Enter a valid email address') => body(field)
  .trim()
  .isEmail()
  .withMessage(message);

export const validateComparison = (field1, field2, message = 'Passwords do not match.') => [
  body(field1)
    .not()
    .isEmpty()
    .withMessage(`${field1} is required`),
  body(field2)
    .not()
    .isEmpty()
    .withMessage(`${field2} is required`)
    .custom((password, { req }) => {
      if (password !== req.body[field1]) {
        throw new Error(message);
      } else {
        return password;
      }
    }),
];

export const handleValidation = (request, response, next) => {
  const errors = validationResult(request).formatWith(({ param, msg }) => ({
    [param]: msg,
  }));
  if (!errors.isEmpty()) {
    return Response.send(
      response,
      STATUS.BAD_REQUEST,
      errors.array({ onlyFirstError: true }),
      MESSAGE.VALIDATE_ERROR,
      false,
    );
  }
  next();
};

export const setModel = (model) => (request, response, next) => {
  response.locals.model = model;
  next();
};
