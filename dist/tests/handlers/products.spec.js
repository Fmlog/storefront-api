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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const product_1 = require("../../models/product");
const user_1 = require("../../models/user");
const request = (0, supertest_1.default)(server_1.default);
describe('Products routes', function () {
    const productStore = new product_1.ProductStore();
    const userStore = new user_1.UserStore();
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const p = {
                name: 'Iphone X',
                price: 500,
                category: 'phones',
            };
            yield productStore.create(p);
            const response = yield request.post('/users').send({
                firstname: 'femi',
                lastname: 'alogba',
                password_digest: 'password123',
            });
            process.env.TEST_TOKEN = response.body.token;
        });
    });
    afterAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield userStore.delete(2);
            yield productStore.delete(2);
        });
    });
    describe('GET /products', function () {
        it('Returns a json array of all products', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request.get('/products');
                expect(response.body).toEqual([
                    {
                        id: 1,
                        name: 'Iphone X',
                        price: 500,
                        category: 'phones',
                    },
                ]);
            });
        });
    });
    describe('GET /product/:id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            it('Returns product of given id', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield request.get('/product/1');
                    expect(response.body).toEqual({
                        id: 1,
                        name: 'Iphone X',
                        price: 500,
                        category: 'phones',
                    });
                });
            });
            it('Returns 400 status for a bad request', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield request.get('/product/A');
                    expect(response.statusCode).toBe(400);
                });
            });
        });
    });
    describe('DELETE /product/:id', function () {
        it('Returns a json of the deleted product', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request
                    .delete('/product/1')
                    .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
                expect(response.body).toEqual({
                    id: 1,
                    name: 'Iphone X',
                    price: 500,
                    category: 'phones',
                });
            });
        });
        it('Returns 401 status for unauthorized post', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request
                    .delete('/product/1');
                expect(response.statusCode).toBe(401);
            });
        });
    });
    describe('POST /products', function () {
        return __awaiter(this, void 0, void 0, function* () {
            it('Returns the created product as a json', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield request
                        .post('/products')
                        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                        .send({ name: 'Iphone 12', price: 600, category: 'phones' });
                    expect(response.body).toEqual({
                        id: 2,
                        name: 'Iphone 12',
                        price: 600,
                        category: 'phones',
                    });
                });
            });
            it('Returns 401 status for unauthorized post', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield request
                        .post('/products')
                        .send({ name: 'Iphone 12', price: 600, category: 'phones' });
                    expect(response.statusCode).toBe(401);
                });
            });
        });
    });
});
