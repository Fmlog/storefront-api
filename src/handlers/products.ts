import { Product, ProductStore } from '../models/product';
import { Response, Request, Application } from 'express';
import { verifyToken } from './authentication';

const store = new ProductStore();

export default function productRoutes(app: Application) {
  app.get('/products', index);
  app.get('/product/:id', show);
  app.post('/products', verifyToken, create);
  app.delete('/product/:id', verifyToken, remove);
}

async function index(_req: Request, res: Response): Promise<void> {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}

async function show(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  try {
    const product = await store.show(id);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}

async function create(req: Request, res: Response): Promise<void> {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const result = await store.create(product);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}

async function remove(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  try {
    const product = await store.delete(id);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}
