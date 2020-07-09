"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _ailments = _interopRequireDefault(require("./ailments"));

var _products = _interopRequireDefault(require("./products"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _validatorHelpers = require("../middleware/validatorHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/ailments', (0, _validatorHelpers.setModel)('Ailment'), _ailments["default"]);
router.use('/products', (0, _validatorHelpers.setModel)('Product'), _products["default"]);
router.all('*', function (request, response) {
  _utils.Response.send(response, _constants.STATUS.NOT_FOUND, null, _constants.MESSAGE.NOT_FOUND, false);
});
var _default = router;
exports["default"] = _default;