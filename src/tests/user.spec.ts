import { User, UserStore } from '../models/user';
const store = new UserStore();
describe('User Model', function () {
  it('Creates new user', async function () {
    const u: User = {
      firstname: 'testing',
      lastname: 'tester',
      password_digest: 'password123',
    };
    const user = await store.create(u);
    expect({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    }).toEqual({ id: 3, firstname: 'testing', lastname: 'tester' });
  });

  it('Return an index of users', async function () {
    const users = await store.index();
    expect([
      {
        id: users[1].id,
        firstname: users[1].firstname,
        lastname: users[1].lastname,
      },
    ]).toEqual([{ id: 3, firstname: 'testing', lastname: 'tester' }]);
  });

  it('');
});
