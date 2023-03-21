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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM orders';
            const conn = yield database_1.default.connect();
            try {
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('Query Failed' + error);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM orders INNER JOIN product_orders on orders.id=product_orders.order_id WHERE order_id=$1';
            const conn = yield database_1.default.connect();
            try {
                const result = yield conn.query(sql, [id]);
                const order = result.rows;
                conn.release();
                return order;
            }
            catch (error) {
                throw new Error('Query Failed' + error);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const conn = yield database_1.default.connect();
            try {
                const res = yield conn.query(sql, [o.status, o.user_id]);
                conn.release();
                const order = res.rows[0];
                return order;
            }
            catch (error) {
                throw new Error('Query Failed' + error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
            const conn = yield database_1.default.connect();
            try {
                const res = yield conn.query(sql, [id]);
                conn.release();
                const order = res.rows[0];
                return order;
            }
            catch (error) {
                throw new Error('Query Failed' + error);
            }
        });
    }
    addProduct(quantity, productId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO product_orders (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            const conn = yield database_1.default.connect();
            try {
                const result = yield conn.query(sql, [quantity, orderId, productId]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (error) {
                throw new Error('Query Failed' + error);
            }
        });
    }
}
exports.OrderStore = OrderStore;
