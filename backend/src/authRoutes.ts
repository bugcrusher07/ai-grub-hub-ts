import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {User} from './user';
import mongoose from 'mongoose';
import { authMiddleware } from './auth';
import { GuestUser } from './user';
// import { JWT_SECRET } from '.';
// const {v4:uuidv4} = require("uuid");
import { v4 } from 'uuid';

interface UserRegisterParams {
  username: string;
  email: string;
  password: string;
}
interface GuestRegisterParams{
  uuid:string,
  isAnonymous:boolean;
}

interface UserSignInWithUsername {
  username: string;
  email?: never;
  password: string;
}

interface UserSignInWithEmail {
  email: string;
  username?: never;
  password: string;
}

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('registerGuest',async (req:Request,res:Response)=>{
  console.log("registering a guest user");
   if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({
      message: 'Database connection is not ready. Try again later.',
    });
  }
  try{
  const guestID = v4();

  const guestUser = await GuestUser.create({
    guestID,
  })
  if(guestUser){
    const token = jwt.sign({id:guestUser._id,isAnonymous:true},JWT_SECRET,{
      expiresIn:'365d',
    })
     res.cookie('token', token, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        domain: 'localhost',
      });

      res.status(201).json({
        _id: guestUser._id,
        tokens:guestUser.tokens,
        isAnyonymouse:true
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }


})
// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  console.log('Register test is working');
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({
      message: 'Database connection is not ready. Try again later.',
    });
  }
  try {
    const { username, email, password }: UserRegisterParams = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });
    if (user) {
      // Generate JWT
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '30d',
      });

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        domain: 'localhost',
      });

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  console.log('login was attempted');
  try {
    const {
      username,
      email,
      password,
    }: UserSignInWithEmail | UserSignInWithUsername = req.body;
    console.log(`username ${username}, email ${email} password ${password}`);

    let user = null;
    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({
      username: user.username,
      email: user.email,
      subscriptoon: user.subscription,
      tokens: user.tokens,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  console.log('me route executed');
  try {
    if(req.user?.isAnonymous){
      const guestUser = await GuestUser.findById(req.user?.id).select('-lastActive')
      if(guestUser){
        return res.status(200).json(guestUser);
      }
    }
    const user = await User.findById(req.user?.id).select('-password');
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
//
router.post('/buyTokensUser',async (req: Request, res: Response) => {
    console.log('we buying tokens');
    req.user;
  }
);
export default router;
