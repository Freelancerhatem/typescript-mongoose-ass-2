import { Request, Response } from 'express';
import { Order } from '../Models/OrderModel';
import { Product } from '../Models/ProductModel';
import { orderSchema } from '../Validators/orderValidator';

export const createOrder = async (req: Request, res: Response) => {

    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    try {
        const product = await Product.findById(req.body.productId);
        if (!product) {

            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (product.inventory.quantity < req.body.quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient quantity available in inventory' });
        }

        const order = new Order(req.body);
        await order.save();

        product.inventory.quantity -= req.body.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        await product.save();

        res.status(201).json({ success: true, message: 'Order created successfully!', data: order });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        res.status(201).json({ success: true, message: 'Orders retrieved successfully!', data: orders });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
export const getOrdersByEmail = async (req: Request, res: Response) => {
    const email = req.query.email;
    if (!email) {

        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const orders = await Order.find({ email: email.toString() });
        res.status(201).json({ success: true, message: 'Orders fetched successfully for user email!', data: orders });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
