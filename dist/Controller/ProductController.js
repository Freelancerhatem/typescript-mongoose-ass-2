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
exports.deleteProduct = exports.updateProductById = exports.retrieveProductById = exports.retrieveProduct = exports.createProduct = void 0;
const ProductModel_1 = require("../Models/ProductModel");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new ProductModel_1.Product(req.body);
        yield product.save();
        res.status(201).json({ success: true, message: "Create Product Successful", data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Add Product Error', error: error.message });
    }
});
exports.createProduct = createProduct;
const retrieveProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        let products;
        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');
            products = yield ProductModel_1.Product.find({
                $or: [
                    { name: regex },
                    { description: regex },
                    { category: regex },
                    { tags: regex },
                ],
            });
            res.status(200).json({ success: true, message: `Products Found  for '${searchTerm}'!`, data: products });
        }
        else {
            products = yield ProductModel_1.Product.find();
            res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});
exports.retrieveProduct = retrieveProduct;
const retrieveProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.Product.findById(req.params.productId);
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    else {
        res.status(201).json({ success: true, message: 'Product found!', data: product });
    }
});
exports.retrieveProductById = retrieveProductById;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    else {
        res.status(201).json({ success: true, message: 'Product updated!', data: product });
    }
});
exports.updateProductById = updateProductById;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel_1.Product.findByIdAndDelete(req.params.productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(201).json({ success: true, message: 'Product deleted!', data: null });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
