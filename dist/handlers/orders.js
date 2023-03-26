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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const authentication_1 = require("./authentication");
const store = new order_1.OrderStore();
function orderRoutes(app) {
    app.get('/orders', authentication_1.verifyToken, index);
    app.get('/order/:id', authentication_1.verifyToken, show);
    app.post('/orders', authentication_1.verifyToken, create);
    app.post('/order/:id', authentication_1.verifyToken, addProduct);
    app.delete('/order/:id', authentication_1.verifyToken, remove);
}
exports.default = orderRoutes;
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const order = yield store.show(id);
            res.json(order);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield store.index();
            res.json(orders);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        try {
            const result = yield store.create(order);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const order = yield store.delete(id);
            res.json(order);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield store.addProduct(req.body.quantity, req.body.product_id, parseInt(req.params.id));
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
