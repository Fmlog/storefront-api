import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    const sql = 'SELECT * FROM products';
    const conn = await Client.connect();

    try {
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async show(id: number): Promise<Product> {
    const sql = 'SELECT * FROM products WHERE id=$1';
    const conn = await Client.connect();

    try {
      const result = await conn.query(sql, [id]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async create(p: Product): Promise<Product> {
    const sql =
      'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
    const conn = await Client.connect();

    try {
      const res = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      const product = res.rows[0];
      return product;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async delete(id: number): Promise<Product> {
    const sql = 'DELETE FROM products WHERE id=$1 RETURNING *';
    const conn = await Client.connect();

    try {
      const res = await conn.query(sql, [id]);
      conn.release();
      const product = res.rows[0];
      return product;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }
}
