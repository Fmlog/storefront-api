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
      user_id: 1,
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
    await userStore.delete(1);
    await productStore.delete(1);
    await store.delete(1);
    await store.delete(2);
  });
  
  it('Adds a product to an order', async function () {
    const product_order = await store.addProduct(10, 1, 1);

    expect(product_order).toEqual({
      id: 1,
      quantity: 10,
      product_id: 1,
      order_id: 1,
    });
  });

  it('Returns all orders', async function () {
    const orders = await store.index();
    expect(orders).toEqual([{ id: 1, status: 'ACTIVE', user_id: 1 }]);
  });

  it('Return orders with given id', async function () {
    const order = await store.show(1);
    expect(order).toEqual({ id: 1, status: 'ACTIVE', user_id: 1 });
  });

  it('Deletes order with given id', async function () {
    const order = await store.delete(1);
    expect(order).toEqual({ id: 1, status: 'ACTIVE', user_id: 1 });
  });

  it('Creates new order', async function () {
    const o: Order = {
      status: 'ACTIVE',
      user_id: 1,
    };
    const order = await store.create(o);
    expect(order).toEqual({ id: 2, status: 'ACTIVE', user_id: 1 });
  });
});
