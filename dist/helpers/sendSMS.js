"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SMS = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _urlencode = _interopRequireDefault(require("urlencode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SMS = /*#__PURE__*/function () {
  function SMS() {
    _classCallCheck(this, SMS);
  }

  _createClass(SMS, null, [{
    key: "send",
    value: function send(message, phone) {
      var url = "http://login.betasms.com/api/?sender=".concat((0, _urlencode["default"])('Project'), "&username=").concat(process.env.SMS_USERNAME, "&password=").concat(process.env.SMS_PASSWORD, "&message=").concat((0, _urlencode["default"])(message), "&mobiles=").concat(phone);
      (0, _requestPromise["default"])(url).then(function (m) {})["catch"](function (e) {});
    }
  }]);

  return SMS;
}();

exports.SMS = SMS;
var _default = {};
exports["default"] = _default;