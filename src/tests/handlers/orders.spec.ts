import supertest from 'supertest';

import { OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('Orders endpoints', function () {
  const orderStore = new OrderStore();
  const userStore = new UserStore();

  beforeAll(async function () {
    const response = await request.post('/users').send({
      firstname: 'femi',
      lastname: 'alogba',
      password_digest: 'password123',
    });
    process.env.TEST_TOKEN = response.body.token;

    const order = {
      user_id: 1,
      status: 'ACTIVE',
    };
    await orderStore.create(order);
  });

  afterAll(async function () {
    await userStore.delete(1);
    await orderStore.delete(2);
  });

  describe('GET /orders', function () {
    it('Return all orders as a json array', async function () {
      const response = await request
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

    it('Returns a 401 status on unauthorised requests', async function () {
      const response = await request.get('/order/A');
      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /order/:id', function () {
    it('Returns json of order given an id', async function () {
      const response = await request
        .get('/order/1')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
      expect(response.body).toEqual({
        id: 1,
        user_id: 1,
        status: 'ACTIVE',
      });
    });

    it('Returns a 400 status on bad requests ', async function () {
      const response = await request
        .get('/order/A')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE /order/:id', function () {
    it('Returns json of deleted order', async function () {
      const response = await request
        .delete('/order/1')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
      expect(response.body).toEqual({
        id: 1,
        user_id: 1,
        status: 'ACTIVE',
      });
    });
    it('Returns a 401 status on unauthorised delete', async function () {
      const response = await request.delete('/order/1');
      expect(response.status).toBe(401)
    });
  });

  describe('POST /orders', function () {
    it('Creates a new order', async function () {
      const response = await request
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
