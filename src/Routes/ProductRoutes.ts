import { Router } from "express"
import { createProduct } from "../Controller/ProductController";

const router = Router();

router.post('/api/products', createProduct)