import express from 'express';
import { ProductController } from '../controllers/productController';

const router = express.Router();

router.get('/', ProductController.getAll,);

router.get('/:countryCode', ProductController.getAll,);

router.get('/:productCode/status/:countryCode', ProductController.getStatus);

export default router;
