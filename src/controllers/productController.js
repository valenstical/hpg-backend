import { Response, paginate } from '../helpers/utils';
import { STATUS } from '../helpers/constants';
import models from '../database/models';

const {
  Prescription, Category, Price
} = models;
export class ProductController {
  static async getAll(request, response) {
    const {
      model, where, order
    } = response.locals;
    const { page, limit, offset } = paginate(request.query);
    try {
      const data = {
        limit,
        offset,
        where,
        order,
        include: [{
          model: Category,
          as: 'category',
          required: false,
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
        },
        {
          model: Price,
          as: 'price',
          required: false,
          where: { country_code: request.params.countryCode || 'NGA' },
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
        }
        ],
      };

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
