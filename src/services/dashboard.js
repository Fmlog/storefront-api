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
exports.DashboardStore = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardStore {
    activeOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status="ACTIVE"';
            try {
                const conn = yield database_1.default.connect();
                const res = yield conn.query(sql, [user_id]);
                return res.rows;
            }
            catch (error) {
                throw new Error('Query failed' + error);
            }
        });
    }
    completedOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status="COMPLETE"';
            try {
                const conn = yield database_1.default.connect();
                const res = yield conn.query(sql, [user_id]);
                return res.rows;
            }
            catch (error) {
                throw new Error('Query failed' + error);
            }
        });
    }
    productsByCat(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM products WHERE category=$1';
            try {
                const conn = yield database_1.default.connect();
                const res = yield conn.query(sql, [category]);
                return res.rows;
            }
            catch (error) {
                throw new Error('Query failed' + error);
            }
        });
    }
    top5Products() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `   SELECT product_id ,name, price, category 
                    FROM product_orders INNER JOIN products 
                    ON product_orders.product_id = products.id
                    GROUP BY name 
                    ORDER BY COUNT(*) DESC 
                    LIMIT 5`;
            try {
                const conn = yield database_1.default.connect();
                const res = yield conn.query(sql);
                return res.rows;
            }
            catch (error) {
                throw new Error('Query failed' + error);
            }
        });
    }
}
exports.DashboardStore = DashboardStore;
