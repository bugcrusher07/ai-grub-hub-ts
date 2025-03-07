import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

// Add user property to Request interface
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from cookie
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error:any) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};