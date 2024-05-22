import mongoose from 'mongoose';

export type OrderType = {
    email: String,
    ProductID: mongoose.Types.ObjectId,
    price: number,
    quantity: number
}