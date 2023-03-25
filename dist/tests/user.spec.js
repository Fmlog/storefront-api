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
const user_1 = require("../models/user");
const store = new user_1.UserStore();
describe('User Model', function () {
    it('Creates new user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const u = {
                firstname: 'testing',
                lastname: 'tester',
                password_digest: 'password123',
            };
            const user = yield store.create(u);
            expect({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
            }).toEqual({ id: 3, firstname: 'testing', lastname: 'tester' });
        });
    });
    it('Return an index of users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield store.index();
            expect([
                {
                    id: users[1].id,
                    firstname: users[1].firstname,
                    lastname: users[1].lastname,
                },
            ]).toEqual([{ id: 3, firstname: 'testing', lastname: 'tester' }]);
        });
    });
    it('');
});
