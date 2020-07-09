"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AilmentController = void 0;

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sequelize = _models["default"].sequelize,
    Prescription = _models["default"].Prescription,
    Product = _models["default"].Product,
    Ailment = _models["default"].Ailment;

var AilmentController = /*#__PURE__*/function () {
  function AilmentController() {
    _classCallCheck(this, AilmentController);
  }

  _createClass(AilmentController, null, [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
        var _response$locals, model, where, raw, _paginate, page, limit, offset, data, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _response$locals = response.locals, model = _response$locals.model, where = _response$locals.where, raw = _response$locals.raw;
                _paginate = (0, _utils.paginate)(request.query), page = _paginate.page, limit = _paginate.limit, offset = _paginate.offset;
                _context.prev = 2;
                data = {
                  limit: limit,
                  offset: offset,
                  where: where,
                  order: [[sequelize.fn('lower', sequelize.col('Ailment.title')), 'ASC']],
                  include: [{
                    model: Prescription,
                    as: 'prescriptions',
                    required: false,
                    attributes: {
                      exclude: ['created_at', 'updated_at', 'ailment_id']
                    }
                  }]
                };

                if (raw) {
                  data.include[0].include = [{
                    model: Product,
                    required: false,
                    as: 'product'
                  }];
                }

                _context.next = 7;
                return _models["default"][model].findAndCountAll(data);

              case 7:
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

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                return _context.abrupt("return", _utils.Response.send(response, _constants.STATUS.SERVER_ERROR, [], 'Server error, please try again.', false));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 11]]);
      }));

      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request, response, next) {
        var body, id, result, prescriptions;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                body = request.body;
                id = body.id;
                delete body.id;

                if (!id) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 7;
                return Ailment.update(body, {
                  where: {
                    id: id
                  },
                  returning: true
                });

              case 7:
                _context2.t0 = _context2.sent;
                _context2.next = 13;
                break;

              case 10:
                _context2.next = 12;
                return Ailment.create(body);

              case 12:
                _context2.t0 = _context2.sent;

              case 13:
                result = _context2.t0;
                prescriptions = body.prescriptions;

                if (!prescriptions) {
                  _context2.next = 21;
                  break;
                }

                prescriptions.forEach(function (prescription) {
                  prescription.ailment_id = id || result.id;
                });
                _context2.next = 19;
                return Prescription.destroy({
                  where: {
                    ailment_id: id || result.id
                  }
                });

              case 19:
                _context2.next = 21;
                return Prescription.bulkCreate(prescriptions, {
                  updateOnDuplicate: ['dosage', 'product_code']
                });

              case 21:
                next(); // return Response.send(response, STATUS.CREATED, result.id, 'Save successful!', true);

                _context2.next = 28;
                break;

              case 24:
                _context2.prev = 24;
                _context2.t1 = _context2["catch"](0);
                console.log(_context2.t1);
                return _context2.abrupt("return", _utils.Response.send(response, _constants.STATUS.UNPROCESSED, [], 'Ailment with that title already exists', false));

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 24]]);
      }));

      function create(_x3, _x4, _x5) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return AilmentController;
}();

exports.AilmentController = AilmentController;
var _default = {};
exports["default"] = _default;