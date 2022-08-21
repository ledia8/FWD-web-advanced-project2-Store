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
const products_model_1 = __importDefault(require("../models/products.model"));
const database_1 = __importDefault(require("../database"));
const productModel = new products_model_1.default();
describe('product Model', () => {
    describe('Test methods exists', () => {
        expect(productModel.getManyProducts).toBeDefined();
    });
    it('should have a get one Product method', () => {
        expect(productModel.getOneProduct).toBeDefined();
    });
    it('should have a create product method', () => {
        expect(productModel.createProduct).toBeDefined();
    });
    it('should have an update product method', () => {
        expect(productModel.updateOneProduct).toBeDefined();
    });
    it('should have a delete product method', () => {
        expect(productModel.deleteOneProduct).toBeDefined();
    });
    describe('Test product Model Logic', () => {
        const product = ({
            name: 'p1',
            price: 1,
            category: 'test',
        });
        () => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM Products;';
            yield connection.query(sql);
            connection.release();
        });
        () => __awaiter(void 0, void 0, void 0, function* () {
            const createProduct = yield productModel.createProduct(product);
            product.id = createProduct.id;
        });
        it('Create method should return a new product', () => __awaiter(void 0, void 0, void 0, function* () {
            const create_product = yield productModel.createProduct({
                name: 'p2',
                price: 1,
                category: 'test',
            });
            expect(create_product).toEqual({
                name: 'p2',
                price: 1,
                category: 'test',
            });
        }));
        it('Get many method should return All available products in database', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield productModel.getManyProducts();
            expect(products.length).toBe(2);
        }));
        it('Get One method should return test product when called with id', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnOneProduct = yield productModel.getOneProduct(product.id);
            expect(returnOneProduct.id).toBe(product.id);
            expect(returnOneProduct.name).toBe(product.name);
            expect(returnOneProduct.price).toBe(product.price);
            expect(returnOneProduct.category).toBe(product.category);
        }));
        it('method update one product by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnOneProduct = yield productModel.updateOneProduct({
                name: 'update',
                price: 1,
                category: 'test',
            });
            expect(returnOneProduct.id).toBe(product.id);
            expect(returnOneProduct.name).toBe('update');
            expect(returnOneProduct.price).toBe(1);
            expect(returnOneProduct.category).toBe('test');
        }));
        it('Delete one product', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteProduct = yield productModel.deleteOneProduct(product.id);
            expect(deleteProduct.id).toBe(product.id);
        }));
    });
});
