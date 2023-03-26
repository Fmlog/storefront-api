import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const SECRET = process.env.TOKEN_SECRET as string;

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    res.status(401).json(error);
  }
}
