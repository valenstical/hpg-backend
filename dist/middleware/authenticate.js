"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.validateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _constants = require("../helpers/constants");

var _utils = require("../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var displayError = function displayError(response) {
  _utils.Response.send(response, _constants.STATUS.UNATHORIZED, null, _constants.MESSAGE.UNATHORIZED_ACCESS, false);
};

var processToken = function processToken(authorization, response, next) {
  var token = authorization.split(' ')[1];

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (error, value) {
    if (error || !value) return displayError(response);
    response.locals.authValue = value;
    next();
  });
};

var validateToken = function validateToken(request, response, next) {
  var authorization = request.headers.authorization;
  if (!authorization) return displayError(response);
  processToken(authorization, response, next);
};

exports.validateToken = validateToken;
var _default = {};
exports["default"] = _default;