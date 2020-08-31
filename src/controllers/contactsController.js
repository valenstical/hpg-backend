import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';

export class ContactsController {
  static async get(request, response) {
    try {
      const { result: { result } } = response.locals;

      const tags = [];

      result.forEach((item) => {
        if (item.tags) tags.push(...item.tags.split(','));
      });

      return Response.send(response, STATUS.OK, { contacts: result, tags: [...new Set(tags)] }, 'Contacts fetched', true);
    } catch (error) {
      console.error(error);
      return Response.send(response, STATUS.UNPROCESSED, [], MESSAGE.SERVER_ERROR, false);
    }
  }
}

export default {};
