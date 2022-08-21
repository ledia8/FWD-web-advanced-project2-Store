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
const order_product_model_1 = __importDefault(require("../models/order_product.model"));
const database_1 = __importDefault(require("../database"));
const order_product_Model = new order_product_model_1.default();
describe('Order Product Model', () => {
    describe('Test methods exists', () => {
        expect(order_product_Model.getManyOrder_Product).toBeDefined();
    });
    it('should have a get one Order_Product method', () => {
        expect(order_product_Model.getManyOrder_Product).toBeDefined();
    });
    it('should have a create Order_Product method', () => {
        expect(order_product_Model.createOrder_Product).toBeDefined();
    });
    it('should have an update Order_Product method', () => {
        expect(order_product_Model.updateOrder_Product).toBeDefined();
    });
    it('should have a delete Order_Product method', () => {
        expect(order_product_Model.deleteOrder_Product).toBeDefined();
    });
    describe('Test Order_Product Model Logic', () => {
        const order_product = ({
            quantity: 1,
            // order_id, product_id,
        });
        () => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM Products;';
            yield connection.query(sql);
            connection.release();
        });
        () => __awaiter(void 0, void 0, void 0, function* () {
            const createOrder_Product = yield order_product_Model.createOrder_Product(order_product);
            order_product.id = createOrder_Product.id;
            order_product.order_id = createOrder_Product.order_id;
            order_product.product_id = createOrder_Product.product_id;
        });
        it('Create method should return a new Order_Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const create_order_product = yield order_product_Model.createOrder_Product(Object.assign(Object.assign({}, order_product), { quantity: 1 }));
            expect(create_order_product).toEqual({
                quantity: 1,
            });
        }));
        it('Get many method should return All available Order_Products in database', () => __awaiter(void 0, void 0, void 0, function* () {
            const order_products = yield order_product_Model.getManyOrder_Product();
            expect(order_products.length).toBe(2);
        }));
        it('method update one Order_Product by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnOneorder_product = yield order_product_Model.updateOrder_Product(Object.assign(Object.assign({}, order_product), { quantity: 11 }));
            expect(returnOneorder_product.quantity).toBe(11);
        }));
        it('Delete one Order_Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteOrder_Product = yield order_product_Model.deleteOrder_Product(order_product.id);
            expect(deleteOrder_Product.id).toBe(order_product.id);
        }));
    });
});
