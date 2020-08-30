import _ from 'lodash';
import { Response, valueFromToken } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';
import models from '../database/models';

export class TrainingController {
  static async createTraining(request, response) {
    const user_code = valueFromToken('user_code', response);
    try {
      const body = _.pick(request.body, 'title', 'description', 'image_url', 'video_code', 'category', 'description');
      body.user_code = user_code;

      const result = await models.Training.create(body);
      Response.send(response, STATUS.CREATED, result, 'Training material posted', true);
      // Send notification.

      return;
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, [], MESSAGE.SERVER_ERROR, false);
    }
  }

  static async updateViews(request, response) {
    try {
      const user_code = valueFromToken('user_code', response);
      const training = await models.Training.findOne({ where: { user_code, id: request.body.id } });
      if (training) {
        const { dataValues } = await training.increment('views');
        return Response.send(response, STATUS.OK, dataValues, 'Training views updated', true);
      }

      return Response.send(response, STATUS.FORBIDDEN, [], MESSAGE.UNATHORIZED_ACCESS, true);
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.SERVER_ERROR, [], MESSAGE.SERVER_ERROR, false);
    }
  }

  static async updateTraining(request, response) {
    try {
      const user_code = valueFromToken('user_code', response);
      const body = _.pick(request.body, 'title', 'description', 'image_url', 'video_code', 'category', 'description');
      const result = await models.Training.update(body, { where: { user_code, id: request.body.id }, returning: true, raw: true });
      return Response.send(response, result[0] ? STATUS.OK : STATUS.UNATHORIZED, result[1].pop(), result[0] ? 'Training material updated' : "You can't update that training material.", true);
    } catch (error) {
      return Response.send(response, STATUS.SERVER_ERROR, [], MESSAGE.SERVER_ERROR, false);
    }
  }

  static async deleteTraining(request, response) {
    const user_code = valueFromToken('user_code', response);
    try {
      await models.Training.destroy({ where: { user_code, id: request.body.id } });
      return Response.send(response, STATUS.OK, [], 'Training material deleted', true);
    } catch (error) {
      return Response.send(response, STATUS.SERVER_ERROR, [], MESSAGE.SERVER_ERROR, false);
    }
  }
}
export default {};
