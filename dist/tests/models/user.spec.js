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
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Model', function () {
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const u = {
                firstname: 'testing',
                lastname: 'tester',
                password_digest: 'password123',
            };
            yield store.create(u);
        });
    });
    afterAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield store.delete(2);
            yield store.delete(3);
        });
    });
    it('Return an index of users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield store.index();
            expect([
                {
                    id: users[0].id,
                    firstname: users[0].firstname,
                    lastname: users[0].lastname,
                },
            ]).toEqual([{ id: 2, firstname: 'testing', lastname: 'tester' }]);
        });
    });
    it('Returns user with given id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield store.show(2);
            expect([
                {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                },
            ]).toEqual([{ id: 2, firstname: 'testing', lastname: 'tester' }]);
        });
    });
    it('Deletes user with given id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield store.delete(2);
            expect({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
            }).toEqual({ id: 2, firstname: 'testing', lastname: 'tester' });
        });
    });
    it('Creates new user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const u = {
                firstname: 'test',
                lastname: 'tester',
                password_digest: 'test123',
            };
            const user = yield store.create(u);
            expect({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
            }).toEqual({ id: 3, firstname: 'test', lastname: 'tester' });
        });
    });
});
