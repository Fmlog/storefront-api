import supertest from 'supertest';

import app from '../../server';
import { Product, ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';
const request = supertest(app);

describe('Products routes', function () {
  const productStore = new ProductStore();
const userStore = new UserStore()
  beforeAll(async function () {
    const p: Product = {
      name: 'Iphone X',
      price: 500,
      category: 'phones',
    };
    await productStore.create(p);

    const response = await request.post('/users').send({
      firstname: 'femi',
      lastname: 'alogba',
      password_digest: 'password123',
    });
    process.env.TEST_TOKEN = response.body.token;
  });
  afterAll(async function(){
    await userStore.delete(2)
    await productStore.delete(2)
  })
  describe('GET /products', function () {
    it('Returns a json array of all products', async function () {
      const response = await request.get('/products');

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

  describe('GET /product/:id', async function () {
    it('Returns product of given id', async function () {
      const response = await request.get('/product/1');
      expect(response.body).toEqual({
        id: 1,
        name: 'Iphone X',
        price: 500,
        category: 'phones',
      });
    });
    it('Returns 400 status for a bad request', async function () {
      const response = await request.get('/product/A');
      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE /product/:id', function () {
    it('Returns a json of the deleted product', async function () {
      const response = await request
        .delete('/product/1')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

      expect(response.body).toEqual({
        id: 1,
        name: 'Iphone X',
        price: 500,
        category: 'phones',
      });
    });
    it('Returns 401 status for unauthorized post', async function () {
        const response = await request
        .delete('/product/1')
        expect(response.statusCode).toBe(401)
    });
  });
  describe('POST /products', async function () {
    it('Returns the created product as a json', async function () {
      const response = await request
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

    it('Returns 401 status for unauthorized post', async function () {
      const response = await request
        .post('/products')
        .send({ name: 'Iphone 12', price: 600, category: 'phones' });
      expect(response.statusCode).toBe(401);
    });
  });
});
