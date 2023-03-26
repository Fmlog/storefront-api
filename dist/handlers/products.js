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
const product_1 = require("../models/product");
const authentication_1 = require("./authentication");
const store = new product_1.ProductStore();
function productRoutes(app) {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/products', authentication_1.verifyToken, create);
    app.delete('/product/:id', authentication_1.verifyToken, remove);
}
exports.default = productRoutes;
function index(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield store.index();
            res.json(products);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const product = yield store.show(id);
            res.json(product);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        try {
            const result = yield store.create(product);
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
            const product = yield store.delete(id);
            res.json(product);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
