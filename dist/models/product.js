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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM products';
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
            const sql = 'SELECT * FROM products WHERE id=$1';
            const conn = yield database_1.default.connect();
            try {
                const result = yield conn.query(sql, [id]);
                conn.release();
                const product = result.rows[0];
                return product;
            }
            catch (error) {
                throw new Error('Query Failed' + error);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const conn = yield database_1.default.connect();
            try {
                const res = yield conn.query(sql, [p.name, p.price, p.category]);
                conn.release();
                const product = res.rows[0];
                return product;
            }
            catch (error) {
                throw new Error('Query Failed' + error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM products WHERE id=$1 RETURNING *';
            const conn = yield database_1.default.connect();
            try {
                const res = yield conn.query(sql, [id]);
                conn.release();
                const product = res.rows[0];
                return product;
            }
            catch (error) {
                throw new Error('Query Failed' + error);
            }
        });
    }
}
exports.ProductStore = ProductStore;
