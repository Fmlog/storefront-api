"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var _a = process.env, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
console.log(process.env.ENV);
console.log(POSTGRES_DB);
console.log(POSTGRES_TEST_DB);
console.log(POSTGRES_HOST);
console.log(POSTGRES_USER);
console.log(POSTGRES_PASSWORD);
var client;
if (ENV === 'test') {
    client = new pg_1.Pool({
        database: POSTGRES_TEST_DB,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
else {
    client = new pg_1.Pool({
        host: '127.0.0.1',
        database: 'storefront',
        user: 'full_stack_user',
        password: 'password123'
    });
    console.log(client);
}
exports["default"] = client;