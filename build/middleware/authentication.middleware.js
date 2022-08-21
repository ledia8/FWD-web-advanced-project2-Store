"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const handleUnAuthenticateError = (next) => {
    const error = new Error('login Error: Please try again');
    error.status = 401;
    next(error);
};
const validateTokenMiddleware = (req, res, next) => {
    try {
        //get authHeader
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLocaleLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer == 'bearer') {
                const decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decode) {
                    next();
                }
                else {
                    //failed to authenticate user
                    handleUnAuthenticateError(next);
                }
            }
            else {
                //token type not bearer
                handleUnAuthenticateError(next);
            }
        }
        else {
            //no token provided
            handleUnAuthenticateError(next);
        }
        //check authHeader validate
        //get value of token
        //check if it bearer token or not
        //verify token --decode based on tokenSecret
        //next()
        //failed to authenticate user
        //token type of beare
        //no token provider
    }
    catch (error) {
        handleUnAuthenticateError(next);
    }
};
exports.default = validateTokenMiddleware;
