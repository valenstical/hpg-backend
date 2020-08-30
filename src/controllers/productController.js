import fetch from 'node-fetch';
import { Response, paginate } from '../helpers/utils';
import { STATUS } from '../helpers/constants';
import models from '../database/models';

const {
  Category, Price, sequelize, Product
} = models;

const getTransformedProduct = (result) => result.map((item) => {
  const val = item.get({ plain: true });
  const price = val.price.length ? val.price[0] : [{}];
  val.price = [
    { id: 1, name: 'Wholesale', value: price.wholesale },
    { id: 2, name: 'Retail', value: price.retail },
    { id: 3, name: 'Novus', value: price.novus },
    { id: 4, name: 'Assistant Supervisor(5%)', value: price['5%'] },
    { id: 5, name: 'Supervisor (8%)', value: price['8%'] },
    { id: 6, name: 'Assistant Manager (13%)', value: price['13%'] },
    { id: 7, name: 'Manager (18%)', value: price['18%'] },
  ];
  val.cc = price.cc;
  val.currency = {
    currency_iso: price.currency_iso,
    currency_symbol: price.currency_symbol,
    country_code: price.country_code,
  };
  return val;
});

export class ProductController {
  static async getByCategory(request, response) {
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
                include: [
                  [sequelize.literal('wholesale - (retail * 0.05)'), '5%'],
                  [sequelize.literal('wholesale - (retail * 0.08)'), '8%'],
                  [sequelize.literal('wholesale - (retail * 0.13)'), '13%'],
                  [sequelize.literal('wholesale - (retail * 0.18)'), '18%']
                ],
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
          result: result.rows.map((row) => {
            const { dataValues } = row;
            return { ...dataValues, products: getTransformedProduct(dataValues.products) };
          }),
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

  static async getCategories(request, response) {
    const { where } = response.locals;
    const { page, limit, offset } = paginate(request.query);
    try {
      const data = {
        limit,
        offset,
        where,
        order: [['priority', 'ASC']],
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
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
        'Categories fetched successfully',
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

  static getPriceTypes(request, response) {
    Response.send(response, STATUS.OK,
      [
        { id: 1, name: 'Wholesale' },
        { id: 2, name: 'Retail' },
        { id: 3, name: 'Novus' },
        { id: 4, name: 'Assistant Supervisor(5%)' },
        { id: 5, name: 'Supervisor (8%)' },
        { id: 6, name: 'Assistant Manager (13%)' },
        { id: 7, name: 'Manager (18%)', },
      ],
      'Price list fetched.');
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
            include: [
              [sequelize.literal('wholesale - (retail * 0.05)'), '5%'],
              [sequelize.literal('wholesale - (retail * 0.08)'), '8%'],
              [sequelize.literal('wholesale - (retail * 0.13)'), '13%'],
              [sequelize.literal('wholesale - (retail * 0.18)'), '18%']
            ],
          },
        }
        ],
      };

      const result = await Product.findAndCountAll(data);
      return Response.send(
        response,
        STATUS.OK,
        {
          result: getTransformedProduct(result.rows),
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
