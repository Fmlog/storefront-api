import { Product, ProductStore } from '../models/product';
import { Response, Request, Application, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.TOKEN_SECRET as string;
const store = new ProductStore();

export default function productRoutes(app: Application) {
  app.get('/products', index);
  app.get('/product/:id', show);
  app.post('/products', create);
  app.delete('/product/:id', remove);
}

async function index(_req: Request, res: Response): Promise<void> {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}

async function show(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    const product = await store.show(id);
    res.json(product);
  } catch (error) {
    res.json(error);
    res.status(400);
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
    res.json(error);
    res.status(400);
  }
}

async function remove(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    const product = await store.delete(id);
    res.json(product);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader?.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    next();
  } catch (error) {
    res.status(401);
    res.json(error);
  }
}
