"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../Controller/ProductController");
const router = (0, express_1.Router)();
router.post('/', ProductController_1.createProduct);
router.get('/', ProductController_1.retrieveProduct);
router.get('/:productId', ProductController_1.retrieveProductById);
router.put('/:productId', ProductController_1.updateProductById);
router.delete('/:productId', ProductController_1.deleteProduct);
exports.default = router;
