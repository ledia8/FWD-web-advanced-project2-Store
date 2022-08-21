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
exports.authenticate = exports.deleteOneUser = exports.updateOneUser = exports.getOneUser = exports.getManyUsers = exports.create = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//ff
const userModel = new users_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.createUser(req.body);
        res.json({ data: user, message: 'created successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const getManyUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.getManyUsers();
        res.json({ data: users, message: 'user retrieved successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.getManyUsers = getManyUsers;
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getOneUser(req.params.id);
        res.json({
            data: user,
            message: 'user retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneUser = getOneUser;
const updateOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.updateOneUser(req.body);
        res.json({
            data: user,
            message: 'user Updated successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getOneUser(req.params.id);
        res.json({
            data: user,
            message: 'user deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOneUser = deleteOneUser;
// authenticate
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        if (!user) {
            return res.status(401).json({
                message: 'the email and password do not match please try again',
            });
        }
        return res.json({
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'user authenticated successfully',
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.authenticate = authenticate;
