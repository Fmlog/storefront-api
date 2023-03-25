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
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Product Model', function () {
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const p = {
                name: 'Iphone 14 pro',
                price: 1200,
                category: 'mobile phones',
            };
            yield store.create(p);
        });
    });
    afterAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield store.delete(2);
        });
    });
    it('Return all products', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield store.index();
            expect(products).toEqual([
                { id: 2, name: 'Iphone 14 pro', price: 1200, category: 'mobile phones' },
            ]);
        });
    });
    it('Return product with given id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield store.show(2);
            expect(product).toEqual({
                id: 2,
                name: 'Iphone 14 pro',
                price: 1200,
                category: 'mobile phones',
            });
        });
    });
    it('Deletes product with given id', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield store.delete(2);
            expect(product).toEqual({
                id: 2,
                name: 'Iphone 14 pro',
                price: 1200,
                category: 'mobile phones',
            });
        });
    });
    it('Creates new product', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const p = {
                name: 'Samsung S23 Ultra',
                price: 1300,
                category: 'mobile phone',
            };
            const product = yield store.create(p);
            expect(product).toEqual({
                id: 3,
                name: 'Samsung S23 Ultra',
                price: 1300,
                category: 'mobile phone',
            });
        });
    });
});
