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
const Orders_model_1 = __importDefault(require("../models/Orders.model"));
const database_1 = __importDefault(require("../database"));
const orderModel = new Orders_model_1.default();
describe('order Model', () => {
    describe('Test methods exists', () => {
        expect(orderModel.getManyOrders).toBeDefined();
    });
    it('should have a get one order method', () => {
        expect(orderModel.getOneOrder).toBeDefined();
    });
    it('should have a create order method', () => {
        expect(orderModel.createOrder).toBeDefined();
    });
    it('should have an update order method', () => {
        expect(orderModel.updateOneOrder).toBeDefined();
    });
    it('should have a delete order method', () => {
        expect(orderModel.deleteOneOrder).toBeDefined();
    });
    describe('Test order Model Logic', () => {
        const order = ({
            // productId:'', 
            // userId:'',
            productQuantity: 1,
            status_of_order: 'complete',
        });
        () => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM Orders;';
            yield connection.query(sql);
            connection.release();
        });
        () => __awaiter(void 0, void 0, void 0, function* () {
            const createOrder = yield orderModel.createOrder(order);
            order.id = createOrder.id;
            order.productId = createOrder.productId;
            order.userId = createOrder.userId;
        });
        it('Get many method should return All available orders in database', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield orderModel.getManyOrders();
            expect(orders.length).toBe(1);
        }));
        it('Get One method should return test order when called with id', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnOneOrder = yield orderModel.getOneOrder(order.id);
            expect(returnOneOrder.id).toBe(order.id);
            expect(returnOneOrder.productId).toBe(order.productId);
            expect(returnOneOrder.userId).toBe(order.userId);
            expect(returnOneOrder.productQuantity).toBe(order.productQuantity);
            expect(returnOneOrder.status_of_order).toBe(order.status_of_order);
        }));
        it('method update one order by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnOneOrder = yield orderModel.updateOneOrder(Object.assign(Object.assign({}, order), { productQuantity: 1, status_of_order: 'active' }));
            expect(returnOneOrder.id).toBe(order.id);
            expect(returnOneOrder.productId).toBe(order.productId);
            expect(returnOneOrder.userId).toBe(order.userId);
            expect(returnOneOrder.productQuantity).toBe(order.productQuantity);
            expect(returnOneOrder.status_of_order).toBe('active');
        }));
        it('Delete one order', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteOneOrder = yield orderModel.deleteOneOrder(order.id);
            expect(deleteOneOrder.id).toBe(order.id);
        }));
    });
});
