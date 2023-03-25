import { Order, OrderStore } from '../models/order';
import { User, UserStore } from '../models/user';

const store = new OrderStore();
const userStore = new UserStore();
describe('Orders Model', function () {
  beforeAll(async function () {
    const u: User = {
      firstname: 'test',
      lastname: 'tester',
      password_digest: 'test123',
    };
    await userStore.create(u);

    const o: Order = {
      status: 'ACTIVE',
      user_id: 1,
    };
    const mockOrder = { id: 1, status: 'ACTIVE', user_id: 1 };
    await store.create(o);
  });

  it('Shows all order', async function () {
    const orders = await store.index();
    expect(orders).toEqual([{ id: 1, status: 'ACTIVE', user_id: 1 }]);
  });

  it('Shows order with given id', async function () {
    const order = await store.show(1);
    expect(order).toEqual({ id: 1, status: 'ACTIVE', user_id: 1 });
  });

  it('Deletes order', async function () {
    const order = await store.delete(1);
    expect(order).toEqual({ id: 1, status: 'ACTIVE', user_id: 1 });
  });

  it('Creates new order', async function () {
    const o: Order = {
      status: 'ACTIVE',
      user_id: 1,
    };
    const order = await store.create(o);
    expect(order).toEqual({ id: 1, status: 'ACTIVE', user_id: 1 });
  });
});
