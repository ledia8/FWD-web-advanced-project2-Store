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
class Order_ProductModel {
    //create
    createOrder_Product(op) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'INSERT INTO Order_Product (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
                //run query
                const result = yield connection.query(sql, [
                    op.quantity, op.order_id, op.product_id
                ]);
                //release connection
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create this order_product ${error.message}`);
            }
        });
    }
    //get all Order_Product
    getManyOrder_Product() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'SELECT quantity, order_id, product_id from Order_Product';
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
    //get specific Order_Product
    getOrder_Product(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'SELECT * FROM Order_Product WHERE id = $1';
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
    //update Order_Product
    updateOrder_Product(op) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `UPDATE Order_Product
                    SET quantity=$1, , order_id=$2, product_id =$3
                    WHERE id=$4
                    RETURNING quantity, order_id, product_id`;
                //run query
                const result = yield connection.query(sql, [
                    op.quantity, op.order_id, op.product_id
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
    //delete Order_Product
    deleteOrder_Product(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `DELETE FROM  Order_Product
                    WHERE id=$1
                    RETURNING quantity, order_id, product_id`;
                //run query
                const result = yield connection.query(sql, [id]);
                //release connection
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to delete Order_Product ${error.message}`);
            }
        });
    }
}
exports.default = Order_ProductModel;
