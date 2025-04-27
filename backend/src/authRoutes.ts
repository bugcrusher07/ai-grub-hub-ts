import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from './user';
import mongoose from 'mongoose';
import { authMiddleware } from './auth';
// import { JWT_SECRET } from '.';

interface UserRegisterParams {
  username: string;
  email: string;
  password: string;
}

interface UserSignInWithUsername {
  username: string;
  email?: never; // Ensure email is not present
  password: string;
}

interface UserSignInWithEmail {
  email: string;
  username?: never; // Ensure username is not present
  password: string;
}

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === 'production', // Use secure in production,
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

// Login user
router.post('/login', async (req: Request, res: Response) => {
  console.log('login was attempted');
  try {
    const {
      username,
      email,
      password,
    }: UserSignInWithEmail | UserSignInWithUsername = req.body;
    console.log(`username ${username}, email ${email} password ${password}`);

    // Find user by email
    let user = null;
    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '30d',
    });

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === 'production', // Use secure in production
    });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Logout user
router.post('/logout', (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get current user (protected route)
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  console.log('me route executed');
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
