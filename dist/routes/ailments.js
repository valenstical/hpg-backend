"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validatorHelpers = require("../middleware/validatorHelpers");

var _commonModelController = require("../controllers/commonModelController");

var _ailmentController = require("../controllers/ailmentController");

var _filters = require("../middleware/filters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var raw = function raw(req, res, next) {
  res.locals.raw = true;
  next();
};

router.get('/raw', _filters.filterCommonQuery, raw, _ailmentController.AilmentController.getAll);
router.get('/', _filters.filterCommonQuery, _ailmentController.AilmentController.getAll);
router.post('/', [(0, _validatorHelpers.validateRequired)('title'), (0, _validatorHelpers.validateOptionalUrl)('external_url')], _validatorHelpers.handleValidation, _ailmentController.AilmentController.create, raw, _ailmentController.AilmentController.getAll);
router["delete"]('/', [(0, _validatorHelpers.validateNumber)('id')], _commonModelController.CommonModelController["delete"]);
var _default = router;
exports["default"] = _default;