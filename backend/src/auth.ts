import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '.';

interface JwtPayload {
  id: string;
  isAnonymous?:boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log("the authMiddleware is being executed")

  const token = req.cookies.token;
  // console.log("token is ",token)

  if (!token) {
    res.status(401).json({ message: 'Not authorized, token not found' });
    return;
  }

  try {
    let bigDecoded;
    try{
    const JWT_SECRET = process.env.JWT_SECRET as any ;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if(decoded){
    bigDecoded=decoded;}
    }catch(error){
      console.log("Error while decoding auth token",error);
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

    req.user = bigDecoded;

    next();
  } catch (error:any) {
    console.log("the error is ",error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};