"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productController = require("../controllers/productController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _productController.ProductController.getAll);
router.get('/list', _productController.ProductController.getList);
router.get('/:countryCode', _productController.ProductController.getAll);
router.get('/:productCode/status/:countryCode', _productController.ProductController.getStatus);
router.get('/seed', function (req, res, next) {});
var _default = router;
exports["default"] = _default;