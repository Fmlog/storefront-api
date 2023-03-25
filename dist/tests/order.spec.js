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
const order_1 = require("../models/order");
const user_1 = require("../models/user");
const store = new order_1.OrderStore();
const userStore = new user_1.UserStore();
describe('Orders Model', function () {
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const u = {
                firstname: 'test',
                lastname: 'tester',
                password_digest: 'test123',
            };
            yield userStore.create(u);
            const o = {
                status: 'ACTIVE',
                user_id: 1,
            };
            const mockOrder = { id: 1, status: 'ACTIVE', user_id: 1 };
            yield store.create(o);
        });
    });
    it('Shows all order', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield store.index();
            expect(orders).toEqual([{ id: 1, status: 'ACTIVE', user_id: 1 }]);
        });
    });
    it('Shows order with given id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield store.show(1);
            expect(order).toEqual({ id: 1, status: 'ACTIVE', user_id: 1 });
        });
    });
    it('Deletes order', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield store.delete(1);
            expect(order).toEqual({ id: 1, status: 'ACTIVE', user_id: 1 });
        });
    });
    it('Creates new order', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const o = {
                status: 'ACTIVE',
                user_id: 1,
            };
            const order = yield store.create(o);
            expect(order).toEqual({ id: 1, status: 'ACTIVE', user_id: 1 });
        });
    });
});
