"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const users_1 = __importDefault(require("./handlers/users"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
const ADDRESS = 'http://localhost:3000';
const CORS_OPTIONS = {
    origin: 'http://localhost:3000',
    optionsSuccesStatus: 200,
};
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(CORS_OPTIONS));
app.get('/', function (_req, res) {
    res.send('Hello World!');
    res.json({ data: 'Hello World!' });
});
(0, orders_1.default)(app);
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, dashboard_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${ADDRESS}`);
});
exports.default = app;
