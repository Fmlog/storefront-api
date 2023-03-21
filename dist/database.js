"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, ENV, } = process.env;
let client;
if (ENV === 'test') {
    client = new pg_1.Pool({
        database: POSTGRES_TEST_DB,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
else {
    client = new pg_1.Pool({
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = client;
