import { Router } from "express";
import { createOrder, getAllOrders } from "../Controller/OrderController";

const router = Router();

router.post('/', createOrder);
router.get('/', getAllOrders);

export default router