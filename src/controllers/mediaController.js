import models from '../database/models';
import { Response } from '../helpers/utils';
import { STATUS, MESSAGE, MEDIA_TYPES } from '../helpers/constants';

export class MediaController {
  static async count(request, response) {
    try {
      const videos = await models.Media.count({ where: { type: MEDIA_TYPES.VIDEO } });
      const images = await models.Media.count({ where: { type: MEDIA_TYPES.IMAGE } });
      const presentations = await models.Media.count({ where: { type: MEDIA_TYPES.PRESENTATION } });
      const pdfs = await models.Media.count({ where: { type: MEDIA_TYPES.PDF } });
      const others = await models.Media.count();

      return Response.send(response, STATUS.OK, {
        videos, images, presentations, pdfs, others: others - (videos + images + presentations + pdfs)
      }, 'Fetched media count', true);
    } catch (error) {
      console.error(error);
      return Response.send(response, STATUS.UNPROCESSED, [], MESSAGE.SERVER_ERROR, false);
    }
  }
}

export default {};
