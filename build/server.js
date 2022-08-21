"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./error.middleware"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const PORT = config_1.default.port || 4000;
//create instance from server
const app = (0, express_1.default)();
//middleware to parse incoming request
app.use(express_1.default.json());
//HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
//HTTP security middleware
app.use((0, helmet_1.default)());
//apply rate limiting middleware to all requests
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 60,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'too much requests',
}));
app.use('/', routes_1.default);
//add routing for /path
app.get('/', (req, res) => {
    throw new Error('error throw');
    res.json({
        message: 'hello world',
    });
});
//app post
app.post('/', (req, res) => {
    res.json({
        message: 'hello world from post',
        data: req.body
    });
});
app.use(error_middleware_1.default);
//error handling 
app.use((_req, res) => {
    res.status(404).json({
        message: 'the endpoint is wrong',
    });
});
//start express server
app.listen(PORT, () => {
    console.log(`server is starting at port : ${PORT}`);
});
exports.default = app;
