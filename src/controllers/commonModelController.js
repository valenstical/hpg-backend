import { Response, paginate, generateToken } from '../helpers/utils';
import { STATUS } from '../helpers/constants';
import models from '../database/models';

export class CommonModelController {
  /**
   * Get all data
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async getAll(request, response, next) {
    const {
      model, where, order, include, attributes, redirect, raw
    } = response.locals;
    const { page, limit, offset } = paginate(request.query);
    try {
      const data = await models[model].findAndCountAll({
        limit,
        offset,
        where,
        order,
        raw,
        include: include || [],
        attributes,
      });
      const result = {
        result: data.rows,
        pagination: {
          currentPage: +page,
          lastPage: Math.ceil(data.count / limit),
          currentCount: data.rows.length,
          totalCount: data.count,
        },
      };
      if (!redirect) {
        return Response.send(
          response,
          STATUS.OK,
          result,
          `${model}s fetched successfully`,
          true,
        );
      }
      response.locals.result = result;
      next();
    } catch (error) {
      console.error(error);
      return Response.send(
        response,
        STATUS.SERVER_ERROR,
        [],
        'Server error, please try again.',
        false,
      );
    }
  }

  static async seedData(req, res) {
    try {
      const users = await models.User.findAll({ raw: true });
      const vals = users.map((item) => {
        let name = item.first_name;
        name = name ? name.split(' ') : ['', ''];
        item.last_name = name.length > 1 ? name.pop() : '';
        item.first_name = name.join(' ');
        item.auth_token = generateToken({ user_code: item.user_code }, '200y');
        return item;
      });

      const d = async () => {
        const v = vals.pop();
        if (v) {
          await models.User.update(v, { where: { user_code: v.user_code } });
          d();
        }
      };

      await d();

      console.log('done');
      Response.send(res);
    } catch (error) {
      console.log(error);
      Response.send(res);
    }
  }

  /**
   * Get all distinct data
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async getAllDistinct(request, response) {
    const { model } = response.locals;
    try {
      const result = await models[model].aggregate('name', 'DISTINCT', {
        plain: false,
        order: [['name', 'ASC']],
        where: CommonModelController.addCollegeId(request),
      });
      return Response.send(response, STATUS.OK, result, `${model}s fetched successfully`, true);
    } catch (error) {
      return Response.send(
        response,
        STATUS.SERVER_ERROR,
        [],
        'Server error, please try again.',
        false,
      );
    }
  }

  /**
   * Add a new data
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async create(request, response) {
    const { model } = response.locals;
    try {
      const { body } = request;
      const result = await models[model].create(body);
      return Response.send(response, STATUS.CREATED, result, `${model} added sucessfully!`, true);
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, [], `${model} already exists.`, false);
    }
  }

  /**
   * Edit the selected data
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async update(request, response) {
    const { model, where } = response.locals;
    try {
      const { body } = request;
      await models[model].update(body, { where: { id: body.id, ...where } });
      return Response.send(response, STATUS.OK, [], `${model} updated sucessfully!`, true);
    } catch (error) {
      console.error(error);
      return Response.send(response, STATUS.UNPROCESSED, [], `${model} already exists.`, false);
    }
  }

  /**
   * Delete the selected data
   * @param {object} request The request object
   * @param {object} response The response object
   * @param {function} next The next callback function
   */
  static async delete(request, response) {
    const { model } = response.locals;
    try {
      const { id } = request.body;
      await models[model].destroy({ where: { id } });
      return Response.send(response, STATUS.OK, [], `${model} deleted sucessfully!`, true);
    } catch (error) {
      console.error(error);
      return Response.send(
        response,
        STATUS.UNPROCESSED,
        [],
        `${model} could not be deleted because it is already in use.`,
        false,
      );
    }
  }
}
export default {};
