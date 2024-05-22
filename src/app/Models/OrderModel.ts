import mongoose, { Schema, model } from 'mongoose';
import { OrderType } from '../Interface/Order.interface';

const OrderSchema = new Schema({
    email: { type: String, required: true },
    productId: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
export const Order = model<OrderType>('Order', OrderSchema)