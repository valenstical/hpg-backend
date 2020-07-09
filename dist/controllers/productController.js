"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ProductController = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Category = _models["default"].Category,
    Price = _models["default"].Price,
    sequelize = _models["default"].sequelize,
    Product = _models["default"].Product;

var ProductController = /*#__PURE__*/function () {
  function ProductController() {
    _classCallCheck(this, ProductController);
  }

  _createClass(ProductController, null, [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
        var _response$locals, model, where, _paginate, page, limit, offset, data, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _response$locals = response.locals, model = _response$locals.model, where = _response$locals.where;
                _paginate = (0, _utils.paginate)(request.query), page = _paginate.page, limit = _paginate.limit, offset = _paginate.offset;
                _context.prev = 2;
                data = {
                  limit: limit,
                  offset: offset,
                  where: where,
                  order: [['priority', 'ASC']],
                  include: [{
                    model: Product,
                    as: 'products',
                    required: true,
                    order: [[sequelize.fn('lower', sequelize.col('Product.title')), 'ASC']],
                    attributes: {
                      exclude: ['created_at', 'updated_at']
                    },
                    include: [{
                      model: Price,
                      as: 'price',
                      required: false,
                      where: {
                        country_code: request.params.countryCode || 'NGA'
                      },
                      attributes: {
                        exclude: ['created_at', 'updated_at']
                      }
                    }]
                  }]
                };
                _context.next = 6;
                return Category.findAndCountAll(data);

              case 6:
                result = _context.sent;
                return _context.abrupt("return", _utils.Response.send(response, _constants.STATUS.OK, {
                  result: result.rows,
                  pagination: {
                    currentPage: +page,
                    lastPage: Math.ceil(result.count / limit),
                    currentCount: result.rows.length,
                    totalCount: result.count
                  }
                }, "".concat(model, "s fetched successfully"), true));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                return _context.abrupt("return", _utils.Response.send(response, _constants.STATUS.SERVER_ERROR, [], 'Server error, please try again.', false));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getList",
    value: function () {
      var _getList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request, response) {
        var _response$locals2, model, where, _paginate2, page, limit, offset, data, result;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _response$locals2 = response.locals, model = _response$locals2.model, where = _response$locals2.where;
                _paginate2 = (0, _utils.paginate)(request.query), page = _paginate2.page, limit = _paginate2.limit, offset = _paginate2.offset;
                _context2.prev = 2;
                data = {
                  limit: limit,
                  offset: offset,
                  where: where,
                  order: [[sequelize.fn('lower', sequelize.col('Product.title')), 'ASC']],
                  attributes: {
                    exclude: ['created_at', 'updated_at']
                  },
                  include: [{
                    model: Category,
                    as: 'category',
                    required: false,
                    attributes: {
                      exclude: ['created_at', 'updated_at']
                    }
                  }, {
                    model: Price,
                    as: 'price',
                    required: false,
                    where: {
                      country_code: request.params.countryCode || 'NGA'
                    },
                    attributes: {
                      exclude: ['created_at', 'updated_at']
                    }
                  }]
                };
                _context2.next = 6;
                return Product.findAndCountAll(data);

              case 6:
                result = _context2.sent;
                return _context2.abrupt("return", _utils.Response.send(response, _constants.STATUS.OK, {
                  result: result.rows,
                  pagination: {
                    currentPage: +page,
                    lastPage: Math.ceil(result.count / limit),
                    currentCount: result.rows.length,
                    totalCount: result.count
                  }
                }, "".concat(model, "s fetched successfully"), true));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](2);
                console.log(_context2.t0);
                return _context2.abrupt("return", _utils.Response.send(response, _constants.STATUS.SERVER_ERROR, [], 'Server error, please try again.', false));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 10]]);
      }));

      function getList(_x3, _x4) {
        return _getList.apply(this, arguments);
      }

      return getList;
    }()
  }, {
    key: "getStatus",
    value: function () {
      var _getStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(request, response) {
        var _request$params, productCode, countryCode, res, html, status;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _request$params = request.params, productCode = _request$params.productCode, countryCode = _request$params.countryCode;
                _context3.prev = 1;
                _context3.next = 4;
                return (0, _nodeFetch["default"])("https://shop.foreverliving.com/retail/shop/shopping.do?task=viewProductDetail&itemCode=".concat(productCode, "&store=").concat(countryCode));

              case 4:
                res = _context3.sent;
                _context3.next = 7;
                return res.text();

              case 7:
                html = _context3.sent;
                status = /OUT OF STOCK/ig.test(html);

                _utils.Response.send(response, 200, !status, status ? 'OUT OF STOCK' : 'AVAILABLE', true);

                _context3.next = 16;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](1);
                console.log(_context3.t0);

                _utils.Response.send(response, _constants.STATUS.SERVER_ERROR, [], "Couldn't get product availability. Try again later.", true);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 12]]);
      }));

      function getStatus(_x5, _x6) {
        return _getStatus.apply(this, arguments);
      }

      return getStatus;
    }()
  }]);

  return ProductController;
}();

exports.ProductController = ProductController;
var _default = {};
exports["default"] = _default;