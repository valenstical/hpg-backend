import express from 'express';
import { ProductController } from '../controllers/productController';

const router = express.Router();

router.get('/', ProductController.getAll,);

router.get('/:countryCode', ProductController.getAll,);

export default router;
