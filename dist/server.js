"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _multer = _interopRequireDefault(require("multer"));

var _pingmydyno = _interopRequireDefault(require("pingmydyno"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

process.env.BASE_DIR = __dirname;

_dotenv["default"].config();

var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000;
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _multer["default"])({
  dest: ''
}).any());
app.use('/api', function (req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    setTimeout(function () {
      next();
    }, 0);
  } else {
    next();
  }
}, _index["default"]);
app.listen(PORT, function () {
  (0, _pingmydyno["default"])(process.env.SERVER_URL);
});
var _default = app;
exports["default"] = _default;