import jwt from 'jsonwebtoken';
import fs from 'fs';
import util from 'util';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { MESSAGE, STATUS } from './constants';

TimeAgo.addLocale(en);

export class Response {
  static send(
    response,
    code = STATUS.OK,
    data = [],
    message = MESSAGE.SUCCESS_MESSAGE,
    status = true,
  ) {
    return response.status(code).json({
      code,
      data,
      message,
      status,
      timestamp: new Date().getTime(),
      config: {
        exchange_rate: 380,
        version: process.env.VERSION,
        message: process.env.UPDATE_MESSAGE,
        url: process.env.UPDATE_URL
      }
    });
  }

  static sendServerError(
    response,
    error,
    message = 'There was a problem processing your request. Please try again or contact us for assistance.',
  ) {
    Response.send(response, STATUS.SERVER_ERROR, error, message, false);
  }
}

export const validatorFormater = ({ param, msg }) => ({
  field: param,
  message: msg,
});

export const generateToken = (payload, expiresIn = '365d') => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });

export const readFile = (file) => util.promisify(fs.readFile)(`${process.env.BASE_DIR}/${file}`, 'utf-8');

export const valueFromToken = (key, response) => {
  const {
    authValue: { [key]: result },
  } = response.locals;
  return result;
};

export const sanitizeValue = (value, initial = '') => value || initial;

export const paginate = (query) => {
  const page = sanitizeValue(query.page, 1);
  const size = sanitizeValue(query.size, 1000);
  const offset = page * size - size;
  return {
    offset,
    limit: size,
    page,
  };
};

export const notify = ({ product }) => {
  //
};

export const convertTimeLapsed = (dateString) => ({ dateString, time_elapsed: new TimeAgo().format(new Date(dateString)) });
