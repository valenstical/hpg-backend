import { Response, paginate } from '../helpers/utils';
import { STATUS } from '../helpers/constants';
import models from '../database/models';

const {
  sequelize, Prescription, Product, Ailment
} = models;
export class AilmentController {
  static async getAll(request, response) {
    const {
      model, where, raw
    } = response.locals;
    const { page, limit, offset } = paginate(request.query);
    try {
      const data = {
        limit,
        offset,
        where,
        order: [[sequelize.fn('lower', sequelize.col('title')), 'ASC']],
        include: [{
          model: Prescription,
          as: 'prescriptions',
          required: false,
          attributes: {
            exclude: ['created_at', 'updated_at', 'ailment_id'],
          },
        }],
      };
      if (raw) {
        data.include[0].include = [
          {
            model: Product,
            required: false,
            as: 'product'
          }
        ];
      }

      const result = await models[model].findAndCountAll(data);
      return Response.send(
        response,
        STATUS.OK,
        {
          result: result.rows,
          pagination: {
            currentPage: +page,
            lastPage: Math.ceil(result.count / limit),
            currentCount: result.rows.length,
            totalCount: result.count,
          },
        },
        `${model}s fetched successfully`,
        true,
      );
    } catch (error) {
      console.log(error);
      return Response.send(
        response,
        STATUS.SERVER_ERROR,
        [],
        'Server error, please try again.',
        false,
      );
    }
  }

  static async create(request, response) {
    try {
      const { body } = request;
      const { id } = body;
      delete body.id;

      const result = id ? await Ailment.update(body, { where: { id }, returning: true })
        : await Ailment.create(body);

      const { prescriptions } = body;
      if (prescriptions) {
        prescriptions.forEach((prescription) => {
          prescription.ailment_id = id || result.id;
        });
        await Prescription.bulkCreate(prescriptions, { updateOnDuplicate: ['dosage', 'product_code'] });
      }

      return Response.send(response, STATUS.CREATED, result.id, 'Save successful!', true);
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, [], 'Ailment with that title already exists', false);
    }
  }
}
export default {};
