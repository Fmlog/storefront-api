import { Product, ProductStore } from '../models/product';
import { Response, Request, Application } from 'express';

const store = new ProductStore();

export default function productRoutes(app: Application) {
  app.get('/products', index);
  app.get('/product/:id', show);
  app.post('/products', create);
  app.delete('/product/:id', remove);
}

async function index(req: Request, res: Response) {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}

async function show(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const product = await store.show(id);
    res.json(product);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}


async function create(req: Request, res: Response) {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    const result = await store.create(product);
    res.json(result);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const product = await store.delete(id);
    res.json(product);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}
