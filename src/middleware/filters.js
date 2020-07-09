import _ from 'lodash';
import models from '../database/models';

const {
  Sequelize: { Op },
} = models;

export const filterCommonQuery = (request, response, next) => {
  const { model } = response.locals;
  const { order } = request.query;
  const columns = _.keys(models[model].rawAttributes);
  const where = _.pick(request.query, columns);
  where.title = { [Op.iLike]: `%${where.title || ''}%` };
  response.locals.where = where;
  response.locals.order = [_.split(order || 'title,ASC', ',')];
  next();
};

export default {};
