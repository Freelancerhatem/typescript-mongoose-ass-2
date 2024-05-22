import mongoose from 'mongoose';

export type OrderType = {
    email: String,
    productId: mongoose.Types.ObjectId,
    price: number,
    quantity: number
}