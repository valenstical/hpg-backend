"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assert = require("assert");

var _utils = require("../../helpers/utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    code: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fboId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.STRING
    },
    firebaseToken: {
      type: DataTypes.STRING
    },
    sponsorId: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    image: {
      type: DataTypes.STRING
    },
    stateId: {
      type: DataTypes.STRING
    },
    countryId: {
      type: DataTypes.STRING
    },
    authToken: {
      type: DataTypes.STRING,
      set: function set(value) {
        this.setDataValue('authToken', (0, _utils.generateToken)({
          code: value
        }, '200y'));
      }
    },
    appActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW
    }
  });
  /**
   * Get a User if exist
   * @param {string} column Column to check against
   * @param {string} value Value to lookup
   * @returns {object} The user details if found, null
   */

  User.getUser = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(column, value) {
      var result, _yield$User$findOne, dataValues;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = null;
              _context.prev = 1;
              _context.next = 4;
              return User.findOne({
                where: _defineProperty({}, column, value),
                attributes: {
                  exclude: ['password']
                }
              });

            case 4:
              _yield$User$findOne = _context.sent;
              dataValues = _yield$User$findOne.dataValues;
              result = dataValues;
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              (0, _assert["throws"])(_context.t0);

            case 12:
              return _context.abrupt("return", result);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return User;
};

exports["default"] = _default;