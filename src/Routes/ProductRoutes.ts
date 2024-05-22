import { Router } from "express"
import { createProduct, retrieveProduct } from "../Controller/ProductController";

const router = Router();

router.post('/', createProduct)
router.get('/', retrieveProduct)

export default router