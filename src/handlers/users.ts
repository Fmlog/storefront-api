import { User, UserStore } from '../models/user';
import { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.TOKEN_SECRET as string;
const store = new UserStore();

export default function userRoutestsc(app: Application) {
  app.get('/users', index);
  app.get('/user/:id', show);
  app.post('/users', create);
  app.delete('/user/:id', remove);
}

async function create(req: Request, res: Response): Promise<void> {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password_digest: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, SECRET);
    res.json(token);
  } catch (error) {
    res.json(error);
    res.status(400);
    console.log(error);
  }
}

async function show(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}
 
async function index(req: Request, res: Response): Promise<void> {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}

async function remove(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    const user = await store.delete(id);
    res.json(user);
  } catch (error) {
    res.json(error);
    res.status(400);
  }
}
