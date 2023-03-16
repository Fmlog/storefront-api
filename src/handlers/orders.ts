import { Order, OrderStore } from '../models/order';
import { Application, Request, Response } from 'express';

const store = new OrderStore();

export default function orderRoutes(app: Application){
  app.get('/orders', index)
  app.get('/order/:id', show)
  app.post('/orders', create)
  app.post('/order/:id', addProduct)
  app.delete('/order/:id', remove)
}

async function show(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const order = await store.show(id);
    res.json(order);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}

async function index(req: Request, res: Response) {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.json(error);
    res.status(400);
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
    res.json(error);
    res.status(400);
  }
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const order = await store.delete(id);
    res.json(order);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}

async function addProduct(req: Request, res: Response) {
  try {
    const result = await store.addProduct(
      req.body.quantity,
      req.body.product_id,
      req.params.id
    );
    res.json(result);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}
