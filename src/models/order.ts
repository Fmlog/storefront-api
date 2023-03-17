import Client from '../database';

export type Order = {
  id?: string;
  status: string;
  user_id: string;
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

  async show(id: string): Promise<Order> {
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

  async delete(id: string) {
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
    productId: string,
    orderId: string
  ): Promise<Order> {
    const sql =
      'INSERT INTO product_orders (quantity, order_id, product_id) VALUES ($1, $2, $3)';
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
