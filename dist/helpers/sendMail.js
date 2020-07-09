"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Mailer = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mailer = /*#__PURE__*/function () {
  function Mailer() {
    _classCallCheck(this, Mailer);
  }

  _createClass(Mailer, null, [{
    key: "send",
    value: function send(email, subject, message) {
      var smtp = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      };
      var content = {
        from: process.env.EMAIL_USERNAME,
        replyTo: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        text: message
      };

      var transport = _nodemailer["default"].createTransport(smtp);

      transport.sendMail(content, function (e) {});
    }
  }]);

  return Mailer;
}();

exports.Mailer = Mailer;
var _default = {};
exports["default"] = _default;