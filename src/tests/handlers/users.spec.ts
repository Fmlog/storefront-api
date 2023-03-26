import supertest from 'supertest';

import app from '../../server';
import { UserStore } from '../../models/user';

const request = supertest(app);

describe('User Routes', function () {
  const userStore = new UserStore();
  beforeAll(async function () {
    const response = await request.post('/users').send({
      firstname: 'femi',
      lastname: 'alogba',
      password_digest: 'password123',
    });
    process.env.TEST_TOKEN = response.body.token;
  });

  afterAll(async function () {
    await userStore.delete(4);
  });

  describe('GET /users', async function () {
    it('Returns json array of users', async function () {
      const response = await request
        .get('/users')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
      const users = response.body;
      expect({
        id: users[0].id,
        firstname: users[0].firstname,
        lastname: users[0].lastname,
      }).toEqual({ id: 3, firstname: 'femi', lastname: 'alogba' });
    });

    it('Returns a 401 for unauthorized request', async function () {
      const response = await request.get('/users');
      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /user/:id', function () {
    it('Returns user as a json', async function () {
      const response = await request
        .get('/user/3')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

      const user = response.body;
      expect({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      }).toEqual({ id: 3, firstname: 'femi', lastname: 'alogba' });
    });

    it('Returns 401 status for unauthorized request', async function () {
      const response = await request.get('/user/3');
      expect(response.statusCode).toBe(401);
    });
  });

  describe('DELETE /user/:id', function () {
    it('Returns deleted user as a json', async function () {
      const response = await request
        .delete('/user/3')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
      const user = response.body;

      expect({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      }).toEqual({ id: 3, firstname: 'femi', lastname: 'alogba' });
    });

    it('Returns 401 status for unauthorized delete', async function () {
      const response = await request.delete('/user/3');
      expect(response.statusCode).toBe(401);
    });
  });
  
  describe('POST /users', function () {
    it('Returns created user as a json', async function () {
      const response = await request.post('/users').send({
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
