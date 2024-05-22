import { Request, Response } from "express";
import { Product } from "../Models/ProductModel";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).json({ success: true, message: "Product Added Successfully", data: product })
    }
    catch (error: any) {
        res.status(500).json({ success: false, message: 'Data Error', error: error.message });
    }
}