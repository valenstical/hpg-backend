import jwt from 'jsonwebtoken';
import { STATUS, MESSAGE } from '../helpers/constants';
import { Response, valueFromToken } from '../helpers/utils';
import { encode } from '../helpers/encryter';
import models from '../database/models';

const displayError = (response) => {
  Response.send(response, STATUS.UNATHORIZED, null, MESSAGE.UNATHORIZED_ACCESS, false);
};

const processToken = async (authorization, response, next) => {
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, async (error, value) => {
    if (error || !value) return displayError(response);
    const user = await models.User.getUser('user_code', value.user_code);
    response.locals.authValue = { ...value, user };
    next();
  });
};

export const validateToken = async (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) return displayError(response);
  await processToken(authorization, response, next);
};

export const validateEditor = async (request, response, next) => {
  const user_code = valueFromToken('user_code', response);
  const user = await models.User.getUser('user_code', user_code);
  return user.is_editor ? next() : displayError(response);
};

export const validateAdmin = async (request, response, next) => {
  const user_code = valueFromToken('user_code', response);
  const user = await models.User.getUser('user_code', user_code);
  return user.is_admin ? next() : displayError(response);
};

export const validateFBO = (request, response, next) => {
  const { headers } = request;
  if (headers.fbo_id && headers.request_token === encode(headers.fbo_id)) {
    next();
  } else {
    return displayError(response);
  }
};

export default {};
