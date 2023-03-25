import { Order, OrderStore } from '../models/order';
import { Application, Request, Response } from 'express';
import { verifyToken } from './authentication';

const store = new OrderStore();

export default function orderRoutes(app: Application) {
  app.get('/orders', index);
  app.get('/order/:id', verifyToken, show);
  app.post('/orders', verifyToken, create);
  app.post('/order/:id', verifyToken, addProduct);
  app.delete('/order/:id', verifyToken, remove);
}

async function show(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const order = await store.show(id);
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function index(req: Request, res: Response) {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function create(req: Request, res: Response) {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id,
  };
  try {
    const result = await store.create(order);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const order = await store.delete(id);
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function addProduct(req: Request, res: Response) {
  try {
    const result = await store.addProduct(
      req.body.quantity,
      req.body.product_id,
      parseInt(req.params.id)
    );
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}
