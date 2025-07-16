import { Router } from 'express';
import { ProductsController } from '../controller/products.controller.js';
export const router=Router()

router.get('/', ProductsController.getProduct)
router.post('/', ProductsController.createProduct)