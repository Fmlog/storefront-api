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
const request = (0, supertest_1.default)(server_1.default);
describe('User Routes', function () {
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.post('/users').send({
                firstname: 'femi',
                lastname: 'alogba',
                password_digest: 'password123',
            });
            process.env.TEST_TOKEN = response.body.token;
        });
    });
    describe('GET /users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            it('Returns json array of users', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield request
                        .get('/users')
                        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
                    const users = response.body;
                    expect({
                        id: users[0].id,
                        firstname: users[0].firstname,
                        lastname: users[0].lastname,
                    }).toEqual({ id: 3, firstname: 'femi', lastname: 'alogba' });
                });
            });
            it('Returns a 401 for unauthorized request', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield request.get('/users');
                    expect(response.statusCode).toBe(401);
                });
            });
        });
    });
    describe('GET /user/:id', function () {
        it('Returns user as a json', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request
                    .get('/user/3')
                    .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
                const user = response.body;
                expect({
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                }).toEqual({ id: 3, firstname: 'femi', lastname: 'alogba' });
            });
        });
        it('Returns a 401 status for unauthorized request', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request.get('/user/3');
                expect(response.statusCode).toBe(401);
            });
        });
    });
    describe('POST /users', function () {
        it('Returns created user as a json', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request.post('/users').send({
                    firstname: 'tayo',
                    lastname: 'alogba',
                    password_digest: 'password123',
                });
                const user = response.body;
                expect({
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                }).toEqual({ id: 4, firstname: 'tayo', lastname: 'alogba' });
            });
        });
    });
});
