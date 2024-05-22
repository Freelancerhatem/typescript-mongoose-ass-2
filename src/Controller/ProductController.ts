import { Request, Response } from "express";
import { Product } from "../Models/ProductModel";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).json({ success: true, message: "Create Product Successful", data: product })
    }
    catch (error: any) {
        res.status(500).json({ success: false, message: 'Add Product Error', error: error.message });
    }
}

export const retrieveProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.find();
        res.status(201).json({ success: true, message: "Retrieve Product Successful", data: product })

    }
    catch (error: any) {
        res.status(500).json({ success: false, message: 'Retrieve Product Failed', error: error.message });
    }

}

export const retrieveProductById = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);
    if (!product) {

        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    else {

        res.status(201).json({ success: true, message: 'Product found!', data: product });
    }
}

export const updateProductById = async (req: Request, res: Response) => {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) {

        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    else {

        res.status(201).json({ success: true, message: 'Product updated!', data: product });
    }
}