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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT = process.env.SALT_ROUND;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM users';
            const conn = yield database_1.default.connect();
            try {
                const res = yield conn.query(sql);
                conn.release();
                const users = res.rows;
                return users;
            }
            catch (error) {
                throw new Error('Query Failed ' + error);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM users WHERE id=$1';
            const conn = yield database_1.default.connect();
            try {
                const res = yield conn.query(sql, [id]);
                conn.release();
                const user = res.rows[0];
                return user;
            }
            catch (error) {
                throw new Error('Query Failed ' + error);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';
            const conn = yield database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password_digest + PEPPER, parseInt(SALT));
            try {
                const res = yield conn.query(sql, [u.firstname, u.lastname, hash]);
                conn.release();
                const user = res.rows[0];
                return user;
            }
            catch (error) {
                throw new Error('Query Failed ' + error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM users WHERE id=$1 RETURNING *';
            const conn = yield database_1.default.connect();
            try {
                const res = yield conn.query(sql, [id]);
                conn.release();
                const user = res.rows[0];
                return user;
            }
            catch (error) {
                throw new Error('Query Failed ' + error);
            }
        });
    }
    authenticate(firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT password_digest FROM users WHERE firstname=$1 AND lastname=$2';
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [firstname, lastname]);
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + PEPPER, user.password_digest)) {
                        return user;
                    }
                    return null;
                }
            }
            catch (error) {
                throw new Error('Query Failed ' + error);
            }
        });
    }
}
exports.UserStore = UserStore;
