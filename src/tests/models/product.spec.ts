import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', function () {
  beforeAll(async function () {
    const p: Product = {
      name: 'Iphone 14 pro',
      price: 1200,
      category: 'mobile phones',
    };
    await store.create(p);
  });

  afterAll(async function () {
    await store.delete(4);
  });

  it('Return all products', async function () {
    const products = await store.index();
    expect(products).toEqual([
      { id: 4, name: 'Iphone 14 pro', price: 1200, category: 'mobile phones' },
    ]);
  });

  it('Return product with given id', async function () {
    const product = await store.show(4);
    expect(product).toEqual({
      id: 4,
      name: 'Iphone 14 pro',
      price: 1200,
      category: 'mobile phones',
    });
  });

  it('Deletes product with given id', async function () {
    const product = await store.delete(4);
    expect(product).toEqual({
      id: 4,
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
      id: 5,
      name: 'Samsung S23 Ultra',
      price: 1300,
      category: 'mobile phone',
    });
  });
});
