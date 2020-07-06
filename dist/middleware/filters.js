"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.filterCommonQuery = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Op = _models["default"].Sequelize.Op;

var filterCommonQuery = function filterCommonQuery(request, response, next) {
  var model = response.locals.model;
  var order = request.query.order;

  var columns = _lodash["default"].keys(_models["default"][model].rawAttributes);

  var where = _lodash["default"].pick(request.query, columns);

  where.title = _defineProperty({}, Op.iLike, "%".concat(where.title || '', "%"));
  response.locals.where = where;
  response.locals.order = [_lodash["default"].split(order || 'title,ASC', ',')];
  next();
};

exports.filterCommonQuery = filterCommonQuery;
var _default = {};
exports["default"] = _default;