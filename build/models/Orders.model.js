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
const database_1 = __importDefault(require("../database"));
class OrderModel {
    //create
    createOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'INSERT INTO orders (productId, userId, productQuantity, status_of_order) VALUES ($1, $2, $3) RETURNING *';
                //run query
                const result = yield connection.query(sql, [
                    o.productId, o.userId, o.productQuantity, o.status_of_order
                ]);
                //release connection
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create this order ${error.message}`);
            }
        });
    }
    //get all orders
    getManyOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'SELECT productId, userId, productQuantity, status_of_order from orders';
                //run query
                const result = yield connection.query(sql);
                //release connection
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to get data ${error.message}`);
            }
        });
    }
    //get specific order
    getOneOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'SELECT * FROM Orders WHERE id = $1';
                //run query
                const result = yield connection.query(sql, [id]);
                //release connection
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to get data ${error.message}`);
            }
        });
    }
    //update order
    updateOneOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `UPDATE orders
                    SET productId=$1, userId=$2, productQuantity=$3, status_of_order=$4
                    WHERE id=$6
                    RETURNING productId, userId, productQuantity, status_of_order`;
                //run query
                const result = yield connection.query(sql, [
                    o.productId, o.userId, o.productQuantity, o.status_of_order,
                ]);
                //release connection
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to update data ${error.message}`);
            }
        });
    }
    //delete order
    deleteOneOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `DELETE FROM  Order
                    WHERE id=$1
                    RETURNING productId, userId, productQuantity, status_of_order`;
                //run query
                const result = yield connection.query(sql, [id]);
                //release connection
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to delete order ${error.message}`);
            }
        });
    }
}
exports.default = OrderModel;
