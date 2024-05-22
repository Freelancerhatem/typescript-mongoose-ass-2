"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByEmail = exports.getAllOrders = exports.createOrder = void 0;
const OrderModel_1 = require("../Models/OrderModel");
const ProductModel_1 = require("../Models/ProductModel");
const orderValidator_1 = require("../Validators/orderValidator");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = orderValidator_1.orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    try {
        const product = yield ProductModel_1.Product.findById(req.body.productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        if (product.inventory.quantity < req.body.quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient quantity available in inventory' });
        }
        const order = new OrderModel_1.Order(req.body);
        yield order.save();
        product.inventory.quantity -= req.body.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        res.status(201).json({ success: true, message: 'Order created successfully!', data: order });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrderModel_1.Order.find();
        res.status(201).json({ success: true, message: 'Orders retrieved successfully!', data: orders });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});
exports.getAllOrders = getAllOrders;
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    try {
        const orders = yield OrderModel_1.Order.find({ email: email.toString() });
        res.status(201).json({ success: true, message: 'Orders fetched successfully for user email!', data: orders });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});
exports.getOrdersByEmail = getOrdersByEmail;
