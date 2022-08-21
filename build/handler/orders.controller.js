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
exports.deleteOrder = exports.updateOneOrder = exports.getOneOrder = exports.getManyOrders = exports.createOrder = void 0;
const Orders_model_1 = __importDefault(require("../models/Orders.model"));
// import config from '../config';
// import jwt from 'jsonwebtoken'
const orderModel = new Orders_model_1.default();
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validation here
        const order = yield orderModel.createOrder(req.body);
        res.json({
            status: 'success',
            data: Object.assign({}, order),
            message: 'order created successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
const getManyOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel.getManyOrders();
        res.json({
            status: 'success',
            data: orders,
            message: 'order retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getManyOrders = getManyOrders;
const getOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel.getOneOrder(req.params.id);
        res.json({
            status: 'success',
            data: order,
            message: 'order retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneOrder = getOneOrder;
const updateOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel.updateOneOrder(req.body);
        res.json({
            status: 'success',
            data: order,
            message: 'order Updated successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOneOrder = updateOneOrder;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel.getOneOrder(req.params.id);
        res.json({
            status: 'success',
            data: order,
            message: 'order deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrder = deleteOrder;
