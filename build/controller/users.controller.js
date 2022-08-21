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
exports.authenticate = exports.deleteOne = exports.updateOne = exports.getOne = exports.getMany = exports.create = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new users_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validation here
        const user = yield userModel.create(req.body);
        res.json({
            status: 'success',
            data: Object.assign({}, user),
            message: 'user created successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const getMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.getMany();
        res.json({
            status: 'success',
            data: users,
            message: 'user retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMany = getMany;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getOne(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: 'user retrieved successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOne = getOne;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.updateOne(req.body);
        res.json({
            status: 'success',
            data: user,
            message: 'user Updated successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOne = updateOne;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getOne(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: 'user deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOne = deleteOne;
// authenticate
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'the username and password do not match please try again',
            });
        }
        return res.json({
            status: 'success',
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'user authenticated successfully',
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.authenticate = authenticate;
