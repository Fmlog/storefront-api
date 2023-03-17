import Client from '../database';

export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password_digest: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    const sql = 'SELECT * FROM users';
    const conn = await Client.connect();

    try {
      const res = await conn.query(sql);
      conn.release();
      const users = res.rows;
      return users;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async show(id: string): Promise<User> {
    const sql = 'SELECT * FROM users WHERE id=$1';
    const conn = await Client.connect();

    try {
      const res = await conn.query(sql, [id]);
      conn.release();
      const user = res.rows[0];
      return user;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async create(u: User): Promise<User> {
    const sql =
      'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';
    const conn = await Client.connect();

    try {
      const res = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password_digest,
      ]);
      conn.release();
      const user = res.rows[0];
      return user
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async delete(id: string): Promise<User> {
    const sql = 'DELETE FROM users WHERE id=$1 RETURNING *'
    const conn = await Client.connect()

    try {
        const res = await conn.query(sql, [id])
        conn.release()
        const user = res.rows[0]
        return user
    } catch (error) {
        throw new Error('Query Failed' + error)
    }
  }
}
