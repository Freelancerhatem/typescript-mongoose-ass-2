"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ProductRoutes_1 = __importDefault(require("./app/Routes/ProductRoutes"));
const OrderRoutes_1 = __importDefault(require("./app/Routes/OrderRoutes"));
const app = (0, express_1.default)();
const port = 3000;
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Server Running Successfully!');
});
app.use('/api/products', ProductRoutes_1.default);
app.use('/api/orders', OrderRoutes_1.default);
exports.default = app;
