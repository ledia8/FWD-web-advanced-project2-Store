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
class ProductsModel {
    //create
    createProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'INSERT INTO Products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
                //run query
                const result = yield connection.query(sql, [
                    p.name, p.price, p.category
                ]);
                //release connection
                connection.release();
                //return created Product
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create this product ${error.message}`);
            }
        });
    }
    //get all Products
    getManyProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'SELECT name, price, category from Products';
                //run query
                const result = yield connection.query(sql);
                //release connection
                connection.release();
                //return created Product
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to get data ${error.message}`);
            }
        });
    }
    //get specific Products
    getOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'SELECT * FROM Products WHERE id = $1';
                //run query
                const result = yield connection.query(sql, [id]);
                //release connection
                connection.release();
                //return created Product
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to get data ${error.message}`);
            }
        });
    }
    //update Products
    updateOneProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `UPDATE Products
                    SET  name=$1, price=$2, category =$3
                    WHERE id=$4
                    RETURNING name, price, category`;
                //run query
                const result = yield connection.query(sql, [
                    p.name, p.price, p.category
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
    //delete Products
    deleteOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `DELETE FROM  Products
                    WHERE id=$1
                    RETURNING name, price, category`;
                //run query
                const result = yield connection.query(sql, [id]);
                //release connection
                connection.release();
                //return created Product
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to delete Product ${error.message}`);
            }
        });
    }
}
exports.default = ProductsModel;
