"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../Controller/OrderController");
const router = (0, express_1.Router)();
router.post('/', OrderController_1.createOrder);
router.get('/', OrderController_1.getAllOrders);
exports.default = router;
