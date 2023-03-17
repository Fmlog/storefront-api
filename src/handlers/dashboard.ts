import { DashboardStore } from '../services/dashboard';
import { Request, Response, Application } from 'express';
import { verifyToken } from './authentication';

const store = new DashboardStore();

export default function dashboardRoutes(app: Application) {
  app.get('/products/:category', productsByCat);
  app.get('/products/top-5', top5Products);
  app.get('/user/:user_id/active-orders', verifyToken, activeOrders);
  app.get('/user/:user_id/past-orders', verifyToken, completedOrders);
}

async function productsByCat(req: Request, res: Response): Promise<void> {
  const category = req.params.category;
  try {
    const products = await store.productsByCat(category);
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function top5Products(_req: Request, res: Response): Promise<void> {
  try {
    const products = await store.top5Products();
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function activeOrders(req: Request, res: Response): Promise<void> {
  const user_id = req.params.id;
  try {
    const orders = await store.activeOrders(user_id);
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function completedOrders(req: Request, res: Response): Promise<void> {
  const user_id = req.params.id;
  try {
    const orders = await store.completedOrders(user_id);
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
}
