"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CommonModelController = void 0;

var _randomInt = _interopRequireDefault(require("random-int"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CommonModelController = /*#__PURE__*/function () {
  function CommonModelController() {
    _classCallCheck(this, CommonModelController);
  }

  _createClass(CommonModelController, null, [{
    key: "getAll",

    /**
     * Get all data
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
        var _response$locals, model, where, order, include, _paginate, page, limit, offset, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _response$locals = response.locals, model = _response$locals.model, where = _response$locals.where, order = _response$locals.order, include = _response$locals.include;
                _paginate = (0, _utils.paginate)(request.query), page = _paginate.page, limit = _paginate.limit, offset = _paginate.offset;
                _context.prev = 2;
                _context.next = 5;
                return _models["default"][model].findAndCountAll({
                  limit: limit,
                  offset: offset,
                  where: where,
                  order: order,
                  include: include || []
                });

              case 5:
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

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", _utils.Response.send(response, _constants.STATUS.SERVER_ERROR, [], 'Server error, please try again.', false));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 9]]);
      }));

      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
    /**
     * Get all distinct data
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "getAllDistinct",
    value: function () {
      var _getAllDistinct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request, response) {
        var model, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = response.locals.model;
                _context2.prev = 1;
                _context2.next = 4;
                return _models["default"][model].aggregate('name', 'DISTINCT', {
                  plain: false,
                  order: [['name', 'ASC']],
                  where: CommonModelController.addCollegeId(request)
                });

              case 4:
                result = _context2.sent;
                return _context2.abrupt("return", _utils.Response.send(response, _constants.STATUS.OK, result, "".concat(model, "s fetched successfully"), true));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", _utils.Response.send(response, _constants.STATUS.SERVER_ERROR, [], 'Server error, please try again.', false));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function getAllDistinct(_x3, _x4) {
        return _getAllDistinct.apply(this, arguments);
      }

      return getAllDistinct;
    }()
  }, {
    key: "addCollegeId",
    value: function addCollegeId(request) {
      var collegeId = request.query.collegeId;
      return collegeId ? {
        collegeId: collegeId
      } : {};
    }
    /**
     * Add a new data
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(request, response) {
        var model, body, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                model = response.locals.model;
                _context3.prev = 1;
                body = request.body;
                _context3.next = 5;
                return _models["default"][model].create(body);

              case 5:
                result = _context3.sent;
                return _context3.abrupt("return", _utils.Response.send(response, _constants.STATUS.CREATED, result, "".concat(model, " added sucessfully!"), true));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);
                console.log(_context3.t0);
                return _context3.abrupt("return", _utils.Response.send(response, _constants.STATUS.UNPROCESSED, [], "".concat(model, " already exists."), false));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 9]]);
      }));

      function create(_x5, _x6) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Add multiple advisors
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "createAdvisors",
    value: function () {
      var _createAdvisors = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(request, response, next) {
        var collegeId, advisors, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                collegeId = response.locals.collegeId;
                _context4.prev = 1;
                advisors = request.body.advisors;
                data = advisors.map(function (item) {
                  return {
                    name: item,
                    id: (0, _randomInt["default"])(1000000, 9999999),
                    collegeId: collegeId
                  };
                });
                _context4.next = 6;
                return _models["default"].Advisor.bulkCreate(data);

              case 6:
                _context4.next = 10;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);

              case 10:
                next();

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));

      function createAdvisors(_x7, _x8, _x9) {
        return _createAdvisors.apply(this, arguments);
      }

      return createAdvisors;
    }()
    /**
     * Edit the selected data
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(request, response) {
        var model, body;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                model = response.locals.model;
                _context5.prev = 1;
                body = request.body;
                _context5.next = 5;
                return _models["default"][model].update(body, {
                  where: {
                    id: body.id
                  }
                });

              case 5:
                return _context5.abrupt("return", _utils.Response.send(response, _constants.STATUS.OK, [], "".concat(model, " updated sucessfully!"), true));

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);
                console.error(_context5.t0);
                return _context5.abrupt("return", _utils.Response.send(response, _constants.STATUS.UNPROCESSED, [], "".concat(model, " already exists."), false));

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 8]]);
      }));

      function update(_x10, _x11) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Delete the selected data
     * @param {object} request The request object
     * @param {object} response The response object
     * @param {function} next The next callback function
     */

  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(request, response) {
        var model, id;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                model = response.locals.model;
                _context6.prev = 1;
                id = request.body.id;
                _context6.next = 5;
                return _models["default"][model].destroy({
                  where: {
                    id: id
                  }
                });

              case 5:
                return _context6.abrupt("return", _utils.Response.send(response, _constants.STATUS.OK, [], "".concat(model, " deleted sucessfully!"), true));

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](1);
                console.error(_context6.t0);
                return _context6.abrupt("return", _utils.Response.send(response, _constants.STATUS.UNPROCESSED, [], "".concat(model, " could not be deleted because it is already in use."), false));

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 8]]);
      }));

      function _delete(_x12, _x13) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return CommonModelController;
}();

exports.CommonModelController = CommonModelController;
var _default = {};
exports["default"] = _default;