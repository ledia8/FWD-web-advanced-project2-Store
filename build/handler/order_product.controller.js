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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder_Product = exports.updateOrder_Product = exports.getOrder_Product = exports.getManyOrder_Product = exports.createOrder_Product = void 0;
const order_product_model_1 = __importDefault(require("../models/order_product.model"));
// import config from '../config';
// import jwt from 'jsonwebtoken'
const order_productModel = new order_product_model_1.default();
const createOrder_Product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validation here
        const order_product = yield order_productModel.createOrder_Product(req.body);
        res.json({
            status: 'success',
            data: Object.assign({}, order_product),
            message: 'order_product created successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder_Product = createOrder_Product;
const getManyOrder_Product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_product = yield order_productModel.getManyOrder_Product();
        res.json({
            status: 'success',
            data: order_product,
            message: 'order_product retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getManyOrder_Product = getManyOrder_Product;
const getOrder_Product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_product = yield order_productModel.getOrder_Product(req.params.id);
        res.json({
            status: 'success',
            data: order_product,
            message: 'order_product retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOrder_Product = getOrder_Product;
const updateOrder_Product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_product = yield order_productModel.updateOrder_Product(req.body);
        res.json({
            data: order_product,
            message: 'order_product Updated successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrder_Product = updateOrder_Product;
const deleteOrder_Product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_product = yield order_productModel.getOrder_Product(req.params.id);
        res.json({
            data: order_product,
            message: 'order_product deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrder_Product = deleteOrder_Product;
