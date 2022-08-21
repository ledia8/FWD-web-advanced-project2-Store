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
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../config"));
const hashpassword = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
};
class UserModel {
    //create
    createUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `INSERT INTO users (email, user_name, first_name,last_name, password)
            values ($1,$2,$3,$4,$5) returning *`;
                //run query
                const result = yield connection.query(sql, [
                    u.email, u.user_name, u.first_name, u.last_name, hashpassword(u.password),
                ]);
                //release connection
                connection.release();
                //return created user
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create this user 
                (${u.user_name}): ${error.message}`);
            }
        });
    }
    //get all users
    getManyUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = 'SELECT id, email, user_name, first_name, last_name from users';
                //run query
                const result = yield connection.query(sql);
                //release connection
                connection.release();
                //return created user
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to get data ${error.message}`);
            }
        });
    }
    //get specific user
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `SELECT id, email, user_name, first_name, last_name from users
            where id = ($1)`; //id=($1)
                //run query
                const result = yield connection.query(sql, [id]);
                //release connection
                connection.release();
                //return created user
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to get data ${error.message}`);
            }
        });
    }
    //update user
    updateOneUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `UPDATE users
                    SET email=$1, user_name=$2, first_name=$3, last_name=$4,password=$5
                    WHERE id=$6
                    RETURNING id, email, user_name, first_name, last_name`;
                //run query
                const result = yield connection.query(sql, [
                    u.email, u.user_name, u.first_name, u.last_name, hashpassword(u.password), u.id,
                ]);
                //release connection
                connection.release();
                //return created user
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to update data ${error.message}`);
            }
        });
    }
    //delete user
    deleteOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection of db
                const connection = yield database_1.default.connect();
                //write query
                const sql = `DELETE FROM  users
                    WHERE id=$1
                    RETURNING id, email, user_name, first_name, last_name`;
                //run query
                const result = yield connection.query(sql, [id]);
                //release connection
                connection.release();
                //return created user
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to delete user ${error.message}`);
            }
        });
    }
    //authenticate user
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE email=$1';
                const result = yield connection.query(sql, [email]);
                if (result.rows.length) {
                    const { password: hashPassword } = result.rows[0];
                    const isPasswordValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPassword);
                    if (isPasswordValid) {
                        const userInfo = yield connection.query('SELECT id,email,user_name,first_name,last_name FROM users WHERE email=($1)', [email]);
                        return userInfo.rows[0];
                    }
                }
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error(`Unable to login: ${error.message}`);
            }
        });
    }
}
exports.default = UserModel;
