import { valueFromToken } from '../helpers/utils';
import models from '../database/models';

export const searchByFboId = (req, res, next) => {
  const user = valueFromToken('user', res);
  res.locals.where = { ...res.locals.where, fbo_id: user.fbo_id };
  next();
};

export const addFboIdToBody = async (req, res, next) => {
  const { user_code } = req.body;
  const user = await models.User.getUser('user_code', user_code);
  res.locals.user = user;
  req.body.fbo_id = user.fbo_id;
  next();
};

export default {};
