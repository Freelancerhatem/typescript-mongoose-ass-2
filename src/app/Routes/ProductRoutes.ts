import { Router } from "express"
import { createProduct, deleteProduct, retrieveProduct, retrieveProductById, updateProductById } from "../Controller/ProductController";

const router = Router();

router.post('/', createProduct)
router.get('/', retrieveProduct)
router.get('/:productId', retrieveProductById)
router.put('/:productId', updateProductById)
router.delete('/:productId', deleteProduct)

export default router