import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

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
      user_id: 5,
    };
    await store.create(o);

    const p: Product = {
      name: 'Iphone 14 pro',
      price: 1200,
      category: 'mobile phones',
    };
    await productStore.create(p);
  });

  afterAll(async function () {
    await userStore.delete(5);
    await productStore.delete(3);
    await store.delete(2);
    await store.delete(3);
  });

  it('Adds a product to an order', async function () {
    const product_order = await store.addProduct(10, 3, 3);

    expect(product_order).toEqual({
      id: 1,
      quantity: 10,
      product_id: 3,
      order_id: 3,
    });
  });

  it('Returns all orders', async function () {
    const orders = await store.index();
    expect(orders).toEqual([{ id: 3, status: 'ACTIVE', user_id: 5 }]);
  });

  it('Return orders with given id', async function () {
    const order = await store.show(3);
    expect(order).toEqual({ id: 3, status: 'ACTIVE', user_id: 5 });
  });

  it('Deletes order with given id', async function () {
    const order = await store.delete(3);
    expect(order).toEqual({ id: 3, status: 'ACTIVE', user_id: 5 });
  });

  it('Creates new order', async function () {
    const o: Order = {
      status: 'ACTIVE',
      user_id: 5,
    };
    const order = await store.create(o);
    expect(order).toEqual({ id: 4, status: 'ACTIVE', user_id: 5 });
  });
});
