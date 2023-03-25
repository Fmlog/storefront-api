import { Product, ProductStore } from '../models/product';
import { User, UserStore } from '../models/user';

const store = new ProductStore();
const userStore = new UserStore();

describe('Product Model', function () {
  beforeAll(async function () {
    const u: User = {
      firstname: 'test',
      lastname: 'tester',
      password_digest: 'test123',
    };
    await userStore.create(u);

    const p: Product = {
      name: 'Iphone 14 pro',
      price: 1200,
      category: 'mobile phones',
    };
    await store.create(p);
  });
  afterAll(async function () {
    
  })

  it('Shows all products', async function () {
    const products = await store.index();
    expect(products).toEqual([
      { id: 1, name: 'Iphone 14 pro', price: 1200, category: 'mobile phones' },
    ]);
  });

  it('Shows product with given id', async function () {
    const product = await store.show(1);
    expect(product).toEqual({
      id: 1,
      name: 'Iphone 14 pro',
      price: 1200,
      category: 'mobile phones',
    });
  });

  it('Deletes product', async function () {
    const product = await store.delete(1);
    expect(product).toEqual({
      id: 1,
      name: 'Iphone 14 pro',
      price: 1200,
      category: 'mobile phones',
    });
  });

  it('Creates new product', async function () {
    const p: Product = {
      name: 'Samsung S23 Ultra',
      price: 1300,
      category: 'mobile phone',
    };
    const product = await store.create(p);
    expect(product).toEqual({
      id: 2,
      name: 'Samsung S23 Ultra',
      price: 1300,
      category: 'mobile phone',
    });
  });

});
