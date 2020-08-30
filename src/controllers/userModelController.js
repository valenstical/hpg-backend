/* eslint-disable import/prefer-default-export */
import Random from 'random-int';
import axios from 'axios';
import _ from 'lodash';
import { Response, valueFromToken } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';
import models from '../database/models';

export class UserModelController {
  static async getUser(request, response) {
    try {
      const user_code = valueFromToken('user_code', response);
      const { fbo_id } = request.body;
      const result = await models.User.findOne({ where: { user_code, fbo_id }, raw: true });
      return Response.send(
        response,
        STATUS.OK,
        result,
        'Distrubutor data fetched successfully',
        true,
      );
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

  static async getActivations(request, response) {
    try {
      const { body } = request;
      const result = await models.Activation.findAll(
        {
          where: body,
          raw: true,
          nest: true,
          include: [{
            model: models.User,
            as: 'user',
            required: true,
          }],
        }
      );
      return Response.send(
        response,
        STATUS.OK,
        {
          result,
          can_activate: result.length < 2
        },
        result.length < 2 ? 'Activations fetched successfully' : 'You have exceeded the number of times you can activate the app. Please contact support@hpgworldwide.org for further assistance.',
        true,
      );
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

  static async activateUser(request, response) {
    try {
      const { fbo_id, firebase_token } = request.body;
      const user_code = valueFromToken('user_code', response);

      await models.Activation.create({ fbo_id, user_code });

      const result = await models.User.update({ fbo_id, firebase_token },
        { where: { user_code, fbo_id }, returning: true, raw: true });

      return Response.send(response, STATUS.CREATED, result[1].pop(), 'Activation Successful!', true);
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, [], MESSAGE.SERVER_ERROR, false);
    }
  }

  static async createUser(request, response) {
    try {
      const body = _.pick(request.body, 'firebase_token', 'fbo_id', 'level', 'first_name', 'country_code', 'state_code', 'phone', 'last_name', 'email', 'sponsor_id');
      body.user_code = Random(1000000, 9999999);
      body.auth_token = body.user_code;
      const result = await models.User.create(body);

      await models.Activation.create(body);

      return Response.send(response, STATUS.CREATED, result, 'Distributor added sucessfully!', true);
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, [], 'Distributor with that email already exists.', false);
    }
  }

  static async verifyUser(request, response) {
    try {
      const { fbo_id, country_code } = request.body;
      const { data } = await axios.get(`https://apigw.foreverliving.com/api/reporttdm/V2/downlineSearch/fboId/234000087844/country/${country_code}/searchTerm/${fbo_id}`,
        {
          headers: {
            Authorization: process.env.FLP_360_TOKEN
          }
        });
      const { frontline } = data;
      const result = { is_member: false };

      if (frontline.length) {
        const uplines = frontline[0].uplineDistributors;
        result.is_member = true;
        result.last_name = frontline[0].lastName;
        result.first_name = frontline[0].firstName;
        result.fbo_id = fbo_id;
        result.country_code = country_code;
        result.level = frontline[0].memberLevel;
        result.sponsor_id = uplines.substring(0, uplines.lastIndexOf(',')).split(',').pop();
        result.active = frontline[0].active;
      }

      Response.send(response, STATUS.OK, result, frontline.length ? 'Verification successful!' : 'You are not eligible to use the HPG app because you are not a member of the HPG team. Please contact your sponsor for further assitance.');
    } catch (error) {
      // Send mail
      console.error(error);
      Response.send(response, STATUS.SERVER_ERROR, [], 'There was an error verifying your membership of the HPG team. Please try again later or contact support@hpgworldwide.org for assistance.');
    }
  }

  static async getStatus(request, response) {
    try {
      const { fbo_id, country_code } = request.body;
      const res = await axios.get(`https://apigw.foreverliving.com/api/reporttdm/V2/downlineSearch/fboId/234000087844/country/${country_code}/searchTerm/${fbo_id}`,
        {
          headers: {
            Authorization: process.env.FLP_360_TOKEN
          }
        });
      console.log(res);

      Response.send(response, STATUS.OK, [], '', true);
    } catch (error) {
      console.error(error);
      Response.send(response, STATUS.SERVER_ERROR, [], 'There was a problem getting your active status. Please try again later or contact support@hpgworldwide.org for assistance.');
    }
  }

  static async updateProfile(request, response) {
    try {
      const user_code = valueFromToken('user_code', response);
      const body = _.pick(request.body, 'first_name', 'country_code', 'state_code', 'phone', 'last_name', 'email');
      const result = await models.User.update(body, { where: { user_code }, returning: true, raw: true });
      return Response.send(response, STATUS.OK, result[1].pop(), 'Distributor data updated sucessfully!', true);
    } catch (error) {
      console.error(error);
      return Response.send(response, STATUS.UNPROCESSED, [], 'Distributor email already exists.', false);
    }
  }

  static async updateImage(request, response) {
    try {
      const user_code = valueFromToken('user_code', response);
      const body = _.pick(request.body, 'image_url');
      const result = await models.User.update(body, { where: { user_code }, returning: true, raw: true });
      return Response.send(response, STATUS.OK, result[1].pop(), 'Distributor data updated sucessfully!', true);
    } catch (error) {
      console.error(error);
      return Response.send(response, STATUS.UNPROCESSED, [], 'There was a problem updating your profile image. Please try again later.', false);
    }
  }
}
