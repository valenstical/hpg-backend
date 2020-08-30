import express from 'express';
import { ProductController } from '../controllers/productController';

const router = express.Router();

// Get all products directly
router.get('/list/:countryCode', ProductController.getList);

// Get all product categories
router.get('/categories', ProductController.getCategories);

// Get all products group by category
router.get('/group/:countryCode', ProductController.getByCategory);

// Get product status
router.get('/status/:productCode/:countryCode', ProductController.getStatus);

// Get all price list types
router.get('/pricetypes', ProductController.getPriceTypes);

export default router;
