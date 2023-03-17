import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import userRoutes from './handlers/users';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express();
const address: string = 'http://localhost:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  //res.send('Hello World!');
  res.json({ name: 'Hello' });
});

orderRoutes(app);
productRoutes(app);
userRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
