/* eslint-disable import/prefer-default-export */
import Random from 'random-int';
import _ from 'lodash';
import { Response, valueFromToken } from '../helpers/utils';
import {
  STATUS, MESSAGE, COUNTRIES, LEVELS
} from '../helpers/constants';
import models from '../database/models';
import { fetchCC, fetchLevel } from '../helpers/flp360';

const getStatusMessage = ({
  isActive, isBlocked, activeCC, diff
}) => {
  const hasCC = typeof activeCC === 'number';
  let result = {
    title: hasCC ? `${activeCC} CC` : '--',
    message: hasCC ? `You need ${4 - activeCC}CC to be active\n${diff} days remaining.` : "Can't verify your status",
    color: 'rgba(254, 170, 95, 0.19)',
    icon: 'info',
    iconColor: '#FEAA5F',
    canRefresh: true
  };

  if (isBlocked) {
    result = {
      title: 'App De-activated',
      message: 'You need to be active this month',
      color: 'rgba(241, 93, 79, 0.2)',
      icon: 'times',
      iconColor: '#F15D4F',
      canRefresh: true

    };
  } else if (isActive) {
    result = {
      title: 'Congratulations!',
      message: 'You are 4CC active this month',
      color: 'rgba(118, 211, 203, 0.21)',
      icon: 'check',
      iconColor: '#76D3CB',
      canRefresh: false,

    };
  }

  return result;
};

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
      const { query } = request;
      const result = await models.Activation.findAll(
        {
          where: query,
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
          user: result.length ? result[0].user : {},
          can_activate: result.length < 2,
          countries: COUNTRIES
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
      const { fbo_id, email, firebase_token } = request.body;
      let user = await models.User.findOne({ where: { fbo_id, app_activated: true }, raw: true });

      if (user) {
        return Response.send(response, STATUS.UNATHORIZED, 'Multiple Activations Rejected!', 'It looks like your HPG app is already activated. If you intend to re-activate your app or you are a spouce using the same FBO ID, please send a request to Mr. Ekperigin or contact support@hpgworldwide.org for further assistance.', false);
      }

      user = await models.User.findOne({ where: { fbo_id, email }, raw: true });

      if (user) {
        await models.Activation.create({ fbo_id, user_code: user.user_code });

        const data = await fetchLevel(fbo_id, user.country_code);

        const body = {
          fbo_id,
          firebase_token,
          app_activated: true,
        };
        if (data) {
          body.level = data.level;
          body.sponsor_id = data.sponsor_id;
        }

        const result = await models.User.update(body,
          {
            where: { user_code: user.user_code, fbo_id },
            returning: true,
            raw: true
          });

        return Response.send(response, STATUS.CREATED, { user: result[1].pop(), countries: COUNTRIES }, 'Activation Successful!', true);
      }

      return Response.send(response, STATUS.OK, {
        user: { fbo_id, email },
        countries: COUNTRIES,
      }, 'Welcome to HPG', true);
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, 'Oops!!', MESSAGE.SERVER_ERROR, false);
    }
  }

  static async createUser(request, response) {
    try {
      const body = _.pick(request.body, 'firebase_token', 'fbo_id', 'level', 'first_name', 'country_code', 'phone', 'last_name', 'email', 'sponsor_id');
      body.user_code = Random(1000000, 9999999);
      body.auth_token = body.user_code;
      const result = await models.User.create(body);

      await models.Activation.create(body);

      return Response.send(response, STATUS.CREATED, result, 'Distributor added sucessfully!', true);
    } catch (error) {
      console.log(error);
      return Response.send(response, STATUS.UNPROCESSED, 'Something went wrong!', 'Distributor with that email already exists.', false);
    }
  }

  static async verifyUser(request, response, next) {
    try {
      const { fbo_id, country_code } = request.body;
      const { level, sponsor_id } = await fetchLevel(fbo_id, country_code);

      if (level) {
        request.body.level = level;
        request.body.sponsor_id = sponsor_id;

        if (LEVELS.includes(request.body.level)) {
          return next();
        }

        return Response.send(response, STATUS.UNATHORIZED, 'Oops!!', 'You need to attain the level of atleast an Assitant Supervisor before you can have access to the HPG app.\n\nPlease contact your sponsor for further assistance.', false);
      }
      return Response.send(response, STATUS.UNATHORIZED, 'Eligibility Failed!', 'You are not eligible to use the HPG app because you are not a member of the HPG team.\n\nPlease contact your sponsor or send an email to support@hpgworldwide.org for further assitance.', false);
    } catch (error) {
      Response.send(response, STATUS.SERVER_ERROR, 'Server Error', 'There was an error verifying your membership of the HPG team.\n\nPlease try again later or send an email to support@hpgworldwide.org for assistance.', false);
    }
  }

  static async getStatus(request, response) {
    const user = valueFromToken('user', response);

    try {
      const { isActive, activeCC } = await fetchCC(user);

      const today = new Date().getDate();
      const diff = process.env.MONTH_END - today;

      const isBlocked = !isActive && diff <= 0;

      const result = await models.User.update({ is_active: isActive, is_blocked: isBlocked },
        { where: { user_code: user.user_code }, returning: true, raw: true });

      const data = {
        ...result[1].pop(),
        active_status: getStatusMessage({
          isActive, isBlocked, activeCC, diff
        })
      };
      return Response.send(response, STATUS.OK, data, 'Distributor data updated sucessfully!', true);
    } catch (error) {
      const data = {
        ...user,
        active_status: getStatusMessage({
          isActive: user.is_active, isBlocked: user.is_blocked,
        })
      };
      return Response.send(response, STATUS.UNPROCESSED, data, "Can't verify your current active status. Please try again later or send an email to support @hpgworldwide.org for further assistance.", false);

      // Response.send(response, STATUS.SERVER_ERROR, data, 'There was a problem getting your active status. Please try again later or send an email to support@hpgworldwide.org for assistance.');
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
      const user = valueFromToken('user', response);
      const body = _.pick(request.body, 'image_url');
      const result = await models.User.update(body, { where: { user_code: user.user_code }, returning: true, raw: true });
      return Response.send(response, STATUS.OK, result[1].pop(), 'Distributor data updated sucessfully!', true);
    } catch (error) {
      console.error(error);
      return Response.send(response, STATUS.UNPROCESSED, [], 'There was a problem updating your profile image. Please try again later.', false);
    }
  }
}
