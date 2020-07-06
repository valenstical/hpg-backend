"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.validateUserOrAdmin = exports.validateAdmin = void 0;

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = _models["default"].User;

var sendError = function sendError(response) {
  _utils.Response.send(response, _constants.STATUS.FORBIDDEN, [], 'You do not have permission to perform that action.', false);
};

var validateAdmin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response, next) {
    var accountNumber, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accountNumber = (0, _utils.valueFromToken)('accountNumber', response);
            _context.prev = 1;
            _context.next = 4;
            return User.getUser('accountNumber', accountNumber);

          case 4:
            user = _context.sent;

            if (user.isAdmin) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", sendError(response));

          case 7:
            response.locals.userIsAdmin = true;
            next();
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _utils.Response.sendServerError(response, _context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));

  return function validateAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateAdmin = validateAdmin;

var validateUserOrAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request, response, next) {
    var accountNumber, accNum, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            accountNumber = (0, _utils.valueFromToken)('accountNumber', response);
            accNum = request.params.accountNumber;
            _context2.prev = 2;
            _context2.next = 5;
            return User.getUser('accountNumber', accountNumber);

          case 5:
            user = _context2.sent;

            if (user.isAdmin || accountNumber === accNum) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", sendError(response));

          case 8:
            response.locals.user = user;
            next();
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", _utils.Response.sendServerError(response, _context2.t0));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 12]]);
  }));

  return function validateUserOrAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validateUserOrAdmin = validateUserOrAdmin;
var _default = {};
exports["default"] = _default;