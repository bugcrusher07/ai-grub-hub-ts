import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '.';

interface JwtPayload {
  id: string;
  isAnonymous?:boolean;
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
  console.log("the protected function is running")
  // Get token from cookie
  const token = req.cookies.token;
  console.log("token is ",token)

  // Check if token exists
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    // Verify token
    // const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key" ;
    let bigDecoded;
    try{
    const JWT_SECRET = process.env.JWT_SECRET as any ;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if(decoded){
    bigDecoded=decoded;}
    }catch(error){
    }
    if(!bigDecoded){
    try{
    const JWT_SECRET = "your-secret-key"
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if(decoded){
      bigDecoded=decoded;}
    }catch(error){
    }}
    // const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key" ;

    // Add user from payload
    req.user = bigDecoded;
    // req.user = decoded;

    next();
  } catch (error:any) {
    console.log("the error is ",error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};