import express from 'express';
import { ProductController } from '../controllers/productController';

const router = express.Router();

router.get('/', ProductController.getAll,);

router.get('/list', ProductController.getList,);

router.get('/:countryCode', ProductController.getAll,);

router.get('/:productCode/status/:countryCode', ProductController.getStatus);

router.get('/seed', (req, res, next) => {

});

export default router;
