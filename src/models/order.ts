import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    const sql = 'SELECT * FROM orders';
    const conn = await Client.connect();

    try {
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }
  async show(id: number): Promise<Order> {
    const sql = 'SELECT * FROM orders WHERE id=$1';
    const conn = await Client.connect();

    try {
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async showDetails(id: number): Promise<Order[]> {
    const sql =
      'SELECT * FROM orders INNER JOIN product_orders on orders.id=product_orders.order_id WHERE order_id=$1';
    const conn = await Client.connect();

    try {
      const result = await conn.query(sql, [id]);
      const order = result.rows;
      conn.release();
      return order;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async create(o: Order): Promise<Order> {
    const sql =
      'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
    const conn = await Client.connect();

    try {
      const res = await conn.query(sql, [o.status, o.user_id]);
      conn.release();
      const order = res.rows[0];
      return order;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async delete(id: number) {
    const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
    const conn = await Client.connect();

    try {
      const res = await conn.query(sql, [id]);
      conn.release();
      const order = res.rows[0];
      return order;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async addProduct(
    quantity: number,
    productId: number,
    orderId: number
  ): Promise<{
    id: number;
    quantity: number;
    product_id: number;
    order_id: number;
  }> {
    const sql =
      'INSERT INTO product_orders (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
    const conn = await Client.connect();

    try {
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }
}
