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
        const { searchTerm } = req.query;
        let products;
        if (searchTerm) {
            const regex = new RegExp(searchTerm as string, 'i');
            products = await Product.find({
                $or: [
                    { name: regex },
                    { description: regex },
                    { category: regex },
                    { tags: regex },
                ],
            });
            res.status(200).json({ success: true, message: `Products Found  for '${searchTerm}'!`, data: products });

        } else {
            products = await Product.find();
            res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

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
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        res.status(201).json({ success: true, message: 'Product deleted!', data: null });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};