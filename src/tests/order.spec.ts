import { Order, OrderStore } from '../models/order';
import { User, UserStore } from '../models/user';

const store = new OrderStore();
const userStore = new UserStore();
describe('Orders Model', async function () {
  beforeAll(async function () {
    const u: User = {
      firstname: 'test',
      lastname: 'tester',
      password_digest: 'test123',
    };
    const user = await userStore.create(u);
    console.log(user);
  });
  it('Creates new order', async function () {
    const o: Order = {
      status: 'ACTIVE',
      user_id: '1',
    };
    const mockOrder = { id: '1', status: 'ACTIVE', user_id: '1' };
    const order = await store.create(o);
    expect(order).toBe(mockOrder);
  });
});
