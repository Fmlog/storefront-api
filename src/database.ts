import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

let postgresDB;
if (ENV === 'test') {
  postgresDB = POSTGRES_TEST_DB;
}
if (ENV === 'dev') {
  postgresDB = POSTGRES_DB;
}

const client = new Pool({
  host: POSTGRES_HOST,
  database: postgresDB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
