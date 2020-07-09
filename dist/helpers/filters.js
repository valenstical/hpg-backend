"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.filterQuery = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var filterQuery = function filterQuery(request, response, next) {
  var order = request.query.order;

  var columns = _lodash["default"].keys(_models["default"].Transaction.rawAttributes);

  var where = _lodash["default"].pick(request.query, columns);

  response.locals.where = where;
  response.locals.order = [_lodash["default"].split(order || 'transactionDate,DESC', ',')];
  next();
};

exports.filterQuery = filterQuery;
var _default = {};
exports["default"] = _default;