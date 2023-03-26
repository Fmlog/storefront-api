import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import userRoutes from './handlers/users';
import dashboardRoutes from './handlers/dashboard';

const ADDRESS = 'http://localhost:3000';
const CORS_OPTIONS = {
  origin: 'http://localhost:3000',
  optionsSuccesStatus: 200,
};

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors(CORS_OPTIONS));

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
  res.json({ data: 'Hello World!' });
});

orderRoutes(app);
productRoutes(app);
userRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${ADDRESS}`);
});

export default app;
