"use strict";

require("@babel/polyfill");

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cheerio = require('cheerio');

var fs = require('fs');

var html = fs.readFileSync('./src/seeds/usa.html');
var $ = cheerio.load(html);
var result = [];
var Product = _models["default"].Product;

var create = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var code;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            code = data.code;
            delete data.code;

            if (!Number.isInteger(+data.carton_units)) {
              delete data.carton_units;
            }

            _context.next = 6;
            return Product.update(data, {
              where: {
                code: code
              }
            });

          case 6:
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function create(_x) {
    return _ref.apply(this, arguments);
  };
}();

$('tr').each( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(row) {
    var data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = {};
            data.code = $(this).find('td:nth-child(1) p').html();

            if (!(Number.isInteger(+data.code) && !!data.code && data.code.length === 3)) {
              _context2.next = 8;
              break;
            }

            data.title = String($(this).find('td:nth-child(2) p').html()).replace(/<nobr>/ig, '').replace(/<\/nobr>/ig, '').replace(/&#xA0/ig, '');
            data.carton_units = $(this).find('td:nth-child(7) p').html();
            data.cc = $(this).find('td:nth-child(6) p').html();
            _context2.next = 8;
            return create(data);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
fs.writeFileSync('./src/seeds/path.html', result.join('\n'));