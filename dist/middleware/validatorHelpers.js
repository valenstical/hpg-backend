"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setModel = exports.handleValidation = exports.validateComparison = exports.validateEmail = exports.validateUrl = exports.validateOptionalNumber = exports.validateNumber = exports.validateEmpty = exports.validateOptionalBoolean = exports.validateOptionalUrl = exports.validateOptional = exports.validateRequired = void 0;

var _check = require("express-validator/check");

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validateRequired = function validateRequired(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(field, " is required");
  return (0, _check.body)(field).trim().not().isEmpty().withMessage(message);
};

exports.validateRequired = validateRequired;

var validateOptional = function validateOptional(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Enter a valid ".concat(field);
  return (0, _check.body)(field).trim().optional().not().isEmpty().withMessage(message);
};

exports.validateOptional = validateOptional;

var validateOptionalUrl = function validateOptionalUrl(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Enter a valid ".concat(field);
  return (0, _check.body)(field).optional().trim().isURL({
    require_protocol: true
  }).withMessage(message);
};

exports.validateOptionalUrl = validateOptionalUrl;

var validateOptionalBoolean = function validateOptionalBoolean(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Enter a valid ".concat(field);
  return (0, _check.body)(field).optional().isBoolean().withMessage(message);
};

exports.validateOptionalBoolean = validateOptionalBoolean;

var validateEmpty = function validateEmpty(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(field, " is required");
  return (0, _check.body)(field).not().isEmpty().withMessage(message);
};

exports.validateEmpty = validateEmpty;

var validateNumber = function validateNumber(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(field, " must be a valid number");
  return (0, _check.body)(field).trim().isInt().withMessage(message);
};

exports.validateNumber = validateNumber;

var validateOptionalNumber = function validateOptionalNumber(field) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(field, " must be a 7 digit number");
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000000;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 9999999;
  return (0, _check.body)(field).trim().optional().isInt().withMessage(message).isInt({
    min: min,
    max: max
  }).withMessage(message);
};

exports.validateOptionalNumber = validateOptionalNumber;

var validateUrl = function validateUrl() {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Enter a valid url';
  return (0, _check.body)(field).trim().isURL().withMessage(message);
};

exports.validateUrl = validateUrl;

var validateEmail = function validateEmail() {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'email';
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Enter a valid email address';
  return (0, _check.body)(field).trim().isEmail().withMessage(message);
};

exports.validateEmail = validateEmail;

var validateComparison = function validateComparison(field1, field2) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Passwords do not match.';
  return [(0, _check.body)(field1).not().isEmpty().withMessage("".concat(field1, " is required")), (0, _check.body)(field2).not().isEmpty().withMessage("".concat(field2, " is required")).custom(function (password, _ref) {
    var req = _ref.req;

    if (password !== req.body[field1]) {
      throw new Error(message);
    } else {
      return password;
    }
  })];
};

exports.validateComparison = validateComparison;

var handleValidation = function handleValidation(request, response, next) {
  var errors = (0, _check.validationResult)(request).formatWith(function (_ref2) {
    var param = _ref2.param,
        msg = _ref2.msg;
    return _defineProperty({}, param, msg);
  });

  if (!errors.isEmpty()) {
    return _utils.Response.send(response, _constants.STATUS.BAD_REQUEST, errors.array({
      onlyFirstError: true
    }), _constants.MESSAGE.VALIDATE_ERROR, false);
  }

  next();
};

exports.handleValidation = handleValidation;

var setModel = function setModel(model) {
  return function (request, response, next) {
    response.locals.model = model;
    next();
  };
};

exports.setModel = setModel;