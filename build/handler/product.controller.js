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
exports.deleteProduct = exports.updateOneProduct = exports.getOneProduct = exports.getManyProducts = exports.createProduct = void 0;
const products_model_1 = __importDefault(require("../models/products.model"));
// import config from '../config';
// import jwt from 'jsonwebtoken'
const productsModel = new products_model_1.default();
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validation here
        const product = yield productsModel.createProduct(req.body);
        res.json({
            status: 'success',
            data: Object.assign({}, product),
            message: 'product created successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getManyProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productsModel.getManyProducts();
        res.json({
            status: 'success',
            data: products,
            message: 'products retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getManyProducts = getManyProducts;
const getOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productsModel.getOneProduct(req.params.id);
        res.json({
            status: 'success',
            data: product,
            message: 'product retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneProduct = getOneProduct;
const updateOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productsModel.updateOneProduct(req.body);
        res.json({
            status: 'success',
            data: product,
            message: 'product Updated successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOneProduct = updateOneProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productsModel.getOneProduct(req.params.id);
        res.json({
            status: 'success',
            data: product,
            message: 'product deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
