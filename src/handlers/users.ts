import { User, UserStore } from '../models/user';
import { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from './authentication';

const SECRET = process.env.TOKEN_SECRET as string;
const store = new UserStore();

export default function userRoutestsc(app: Application) {
  app.get('/users', verifyToken, index);
  app.get('/user/:id', verifyToken, show);
  app.post('/users', create);
  app.delete('/user/:id', verifyToken, remove);
  app.post('/login', verifyToken, login);
}

async function create(req: Request, res: Response): Promise<void> {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password_digest: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, SECRET);
    res.json({ ...newUser, token: token });
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}

async function show(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  try {
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}

async function index(req: Request, res: Response): Promise<void> {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}

async function remove(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  try {
    const user = await store.delete(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}

async function login(req: Request, res: Response): Promise<void> {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  try {
    const user = await store.authenticate(firstname, lastname, password);
    if (user) {
      const token = jwt.sign({ user: user }, SECRET);
      res.json({ ...user, token: token });
    } else {
      res.status(400).json({ error: 'User does not exist' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong ' + error });
  }
}
