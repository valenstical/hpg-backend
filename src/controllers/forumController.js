import _ from 'lodash';
import { Response, valueFromToken } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';
import models from '../database/models';

export class ForumController {
  static async createPost(request, response) {
    const user_code = valueFromToken('user_code', response);
    try {
      const body = _.pick(request.body, 'title');
      body.user_code = user_code;
      const result = await models.Forum.create(body);
      return Response.send(response, STATUS.CREATED, result, 'Message sent', true);
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, [], MESSAGE.SERVER_ERROR, false);
    }
  }

  static async createReply(request, response) {
    const user_code = valueFromToken('user_code', response);
    try {
      const body = _.pick(request.body, 'title', 'forum_id');
      body.user_code = user_code;
      const result = await models.ForumReply.create(body);
      Response.send(response, STATUS.CREATED, result, 'Message sent', true);

      const reply = await models.Forum.findOne({ where: { id: body.forum_id } });
      return reply.increment('replies_count');
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, [], MESSAGE.SERVER_ERROR, false);
    }
  }

  static async deletePost(request, response) {
    const user_code = valueFromToken('user_code', response);
    try {
      await models.Forum.destroy({ where: { user_code, id: request.body.id } });
      return Response.send(response, STATUS.OK, [], 'Message deleted', true);
    } catch (error) {
      return Response.send(response, STATUS.SERVER_ERROR, [], MESSAGE.SERVER_ERROR, false);
    }
  }
}
export default {};
