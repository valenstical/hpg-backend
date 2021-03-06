import fetch from 'node-fetch';
import { Response, paginate } from '../helpers/utils';
import { STATUS } from '../helpers/constants';
import models from '../database/models';

const {
  Category, Price, sequelize, Product
} = models;
export class ProductController {
  static async getAll(request, response) {
    const {
      model, where
    } = response.locals;
    const { page, limit, offset } = paginate(request.query);
    try {
      const data = {
        limit,
        offset,
        where,
        order: [['priority', 'ASC']],
        include: [{
          model: Product,
          as: 'products',
          required: true,
          order: [[sequelize.fn('lower', sequelize.col('Product.title')), 'ASC']],
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
          include: [
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
        },
        ],
      };

      const result = await Category.findAndCountAll(data);
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

  static async getList(request, response) {
    const {
      model, where
    } = response.locals;
    const { page, limit, offset } = paginate(request.query);
    try {
      const data = {
        limit,
        offset,
        where,
        order: [[sequelize.fn('lower', sequelize.col('Product.title')), 'ASC']],
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
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

      const result = await Product.findAndCountAll(data);
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

  static async getStatus(request, response) {
    const { productCode, countryCode } = request.params;
    try {
      const res = await fetch(`https://shop.foreverliving.com/retail/shop/shopping.do?task=viewProductDetail&itemCode=${productCode}&store=${countryCode}`);
      const html = await res.text();

      const status = /OUT OF STOCK/ig.test(html);

      Response.send(response, 200, !status, status ? 'OUT OF STOCK' : 'AVAILABLE', true);
    } catch (error) {
      console.log(error);
      Response.send(response, STATUS.SERVER_ERROR, [], "Couldn't get product availability. Try again later.", true);
    }
  }
}

export default {};
