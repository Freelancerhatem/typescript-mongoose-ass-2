import { Router } from "express"
import { createProduct, retrieveProduct, retrieveProductById, updateProductById } from "../Controller/ProductController";

const router = Router();

router.post('/', createProduct)
router.get('/', retrieveProduct)
router.get('/:productId', retrieveProductById)
router.put('/:productId', updateProductById)

export default router