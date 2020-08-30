import { Response, paginate } from '../helpers/utils';
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
      model, where, order, include, attributes, redirect
    } = response.locals;
    const { page, limit, offset } = paginate(request.query);
    try {
      const data = await models[model].findAndCountAll({
        limit,
        offset,
        where,
        order,
        include: include || [],
        attributes,
        raw: true
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
    const { model } = response.locals;
    try {
      const { body } = request;
      await models[model].update(body, { where: { id: body.id } });
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
