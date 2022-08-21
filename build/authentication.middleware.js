"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const validateToken = (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (header) {
            const allHeader = header.split(' ');
            const bearer = allHeader[0];
            const token = allHeader[1];
            if (token && bearer == 'bearer') {
                const decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decode) {
                    next();
                }
            }
        }
        else {
            const error = new Error('login Error: Please try again');
            error.status = 401;
            next(error);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = validateToken;
