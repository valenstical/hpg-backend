import { Response, valueFromToken } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';

export class AutolinksController {
  static async get(request, response) {
    try {
      const { result: { result } } = response.locals;
      const user = valueFromToken('user', response);

      return Response.send(response, STATUS.OK, result.map((item) => {
        item.slug = `${process.env.SITE_URL}/${item.slug.replace(/{{user_code}}/ig, user.user_code).replace(/{{fbo_id}}/ig, user.fbo_id)}`;
        return item;
      }), 'Autolinks fetched', true);
    } catch (error) {
      console.error(error);
      return Response.send(response, STATUS.UNPROCESSED, [], MESSAGE.SERVER_ERROR, false);
    }
  }
}

export default {};
