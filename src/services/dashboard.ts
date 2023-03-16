import Client from '../database';
import { Order } from '../models/order';
import { Product } from '../models/product';

export class DashboardStore {
  async activeOrders(user_id: string): Promise<Order[]> {
    const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status="ACTIVE"';
    try {
      const conn = await Client.connect();
      const res = await conn.query(sql, [user_id]);
      return res.rows;
    } catch (error) {
      throw new Error('Query failed' + error);
    }
  }

  async completedOrders(user_id: string): Promise<Order[]> {
    const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status="COMPLETE"';
    try {
      const conn = await Client.connect();
      const res = await conn.query(sql, [user_id]);
      return res.rows;
    } catch (error) {
      throw new Error('Query failed' + error);
    }
  }

  async productsByCat(category: string): Promise<Product[]> {
    const sql = 'SELECT * FROM products WHERE category=$1';
    try {
      const conn = await Client.connect();
      const res = await conn.query(sql, [category]);
      return res.rows;
    } catch (error) {
      throw new Error('Query failed' + error);
    }
  }

  async top5Products(): Promise<Product[]> {
    const sql = `   SELECT product_id ,name, price, category 
                    FROM product_orders INNER JOIN products 
                    ON product_orders.product_id = products.id
                    GROUP BY name 
                    ORDER BY COUNT(*) DESC 
                    LIMIT 5`;
    try {
      const conn = await Client.connect();
      const res = await conn.query(sql);
      return res.rows;
    } catch (error) {
      throw new Error('Query failed' + error);
    }
  }
}
