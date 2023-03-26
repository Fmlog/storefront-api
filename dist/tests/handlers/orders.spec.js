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
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Orders endpoints', function () {
    const orderStore = new order_1.OrderStore();
    const userStore = new user_1.UserStore();
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.post('/users').send({
                firstname: 'femi',
                lastname: 'alogba',
                password_digest: 'password123',
            });
            process.env.TEST_TOKEN = response.body.token;
            const order = {
                user_id: 1,
                status: 'ACTIVE',
            };
            yield orderStore.create(order);
        });
    });
    afterAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield userStore.delete(1);
            yield orderStore.delete(2);
        });
    });
    describe('GET /orders', function () {
        it('Return all orders as a json array', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request
                    .get('/orders')
                    .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
                expect(response.body).toEqual([
                    {
                        id: 1,
                        user_id: 1,
                        status: 'ACTIVE',
                    },
                ]);
                expect(response.statusCode).toBe(200);
            });
        });
        it('Returns a 401 status on unauthorised requests', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request.get('/order/A');
                expect(response.statusCode).toBe(401);
            });
        });
    });
    describe('GET /order/:id', function () {
        it('Returns json of order given an id', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request
                    .get('/order/1')
                    .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
                expect(response.body).toEqual({
                    id: 1,
                    user_id: 1,
                    status: 'ACTIVE',
                });
            });
        });
        it('Returns a 400 status on bad requests ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request
                    .get('/order/A')
                    .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
                expect(response.statusCode).toBe(400);
            });
        });
    });
    describe('DELETE /order/:id', function () {
        it('Returns json of deleted order', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request
                    .delete('/order/1')
                    .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
                expect(response.body).toEqual({
                    id: 1,
                    user_id: 1,
                    status: 'ACTIVE',
                });
            });
        });
        it('Returns a 401 status on unauthorised delete', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request.delete('/order/1');
                expect(response.status).toBe(401);
            });
        });
    });
    describe('POST /orders', function () {
        it('Creates a new order', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request
                    .post('/orders')
                    .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                    .send({
                    user_id: 1,
                    status: 'ACTIVE',
                });
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual({
                    id: 2,
                    status: 'ACTIVE',
                    user_id: 1,
                });
            });
        });
    });
});
