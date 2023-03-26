import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', function () {
  beforeAll(async function () {
    const u: User = {
      firstname: 'testing',
      lastname: 'tester',
      password_digest: 'password123',
    };
    await store.create(u);
  });

  afterAll(async function () {
    await store.delete(6)
    await store.delete(7);
  });

  it('Return an index of users', async function () {
    const users = await store.index();
    expect([
      {
        id: users[0].id,
        firstname: users[0].firstname,
        lastname: users[0].lastname,
      },
    ]).toEqual([{ id: 6, firstname: 'testing', lastname: 'tester' }]);
  });

  it('Returns user with given id', async function () {
    const user = await store.show(6);
    expect([
      {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    ]).toEqual([{ id: 6, firstname: 'testing', lastname: 'tester' }]);
  });

  it('Deletes user with given id', async function () {
    const user = await store.delete(6);
    expect({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    }).toEqual({ id: 6, firstname: 'testing', lastname: 'tester' });
  });
  
  it('Creates new user', async function () {
    const u: User = {
      firstname: 'test',
      lastname: 'tester',
      password_digest: 'test123',
    };
    const user = await store.create(u);
    expect({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    }).toEqual({ id: 7, firstname: 'test', lastname: 'tester' });
  });
});
