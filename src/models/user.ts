import Client from '../database';
import bcrypt from 'bcrypt';

const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT = process.env.SALT_ROUND;

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
    const hash = bcrypt.hashSync(
      u.password_digest + PEPPER,
      parseInt(SALT as string)
    );

    try {
      const res = await conn.query(sql, [u.firstname, u.lastname, hash]);
      conn.release();
      const user = res.rows[0];
      return user;
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }

  async delete(id: string): Promise<User> {
    const sql = 'DELETE FROM users WHERE id=$1 RETURNING *';
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

  async authenticate(firstname: string, lastname: string, password: string) {
    const sql =
      'SELECT password_digest FROM users WHERE firstname=$1 AND lastname=$2';
    try {
      const conn = await Client.connect();
      const result = await conn.query(sql, [firstname, lastname]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + PEPPER, user.password_digest)) {
          return user;
        }
        return null;
      }
    } catch (error) {
      throw new Error('Query Failed' + error);
    }
  }
}
