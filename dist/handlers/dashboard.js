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
const dashboard_1 = require("../services/dashboard");
const authentication_1 = require("../middleware/authentication");
const store = new dashboard_1.DashboardStore();
function dashboardRoutes(app) {
    app.get('/products/:category', productsByCat);
    app.get('/products/top-5', top5Products);
    app.get('/user/:user_id/active-orders', authentication_1.verifyToken, activeOrders);
    app.get('/user/:user_id/past-orders', authentication_1.verifyToken, completedOrders);
}
exports.default = dashboardRoutes;
function productsByCat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = req.params.category;
        try {
            const products = yield store.productsByCat(category);
            res.json(products);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function top5Products(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield store.top5Products();
            res.json(products);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function activeOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = parseInt(req.params.id);
        try {
            const orders = yield store.activeOrders(user_id);
            res.json(orders);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
function completedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = parseInt(req.params.id);
        try {
            const orders = yield store.completedOrders(user_id);
            res.json(orders);
        }
        catch (error) {
            res.status(400).json({ error: 'Something went wrong ' + error });
        }
    });
}
