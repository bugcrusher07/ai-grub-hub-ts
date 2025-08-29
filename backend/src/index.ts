import express, { Express, Request, Response } from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import path from "path";
import axios from 'axios';
import { generateFitnessPlan,FitnessPlanParams } from './aitools/fitness';
import { EmailParams,generateEmails } from './aitools/email';
import { generateMovieRec, MovieRecParams } from './aitools/movie';
import { CodeParams,generateCode } from './aitools/code';
import { DietParams,generateDietPlan } from './aitools/diet';
import cookieParser from 'cookie-parser';
import authRoutes from './authRoutes';
import { authMiddleware } from './auth';
import { connectDB } from './db';
import { TherapyParams } from './aitools/therapyParams';
import { generateTherapyPlan } from './aitools/therapy';

export const JWT_SECRET = process.env.JWT_SECRET || "a&92&fhia62&#@#*&";

// dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());


connectDB();

app.use(cors({
  origin:[ 'https://ai-grub-hub-ts.vercel.app','http://localhost:3000'],

  credentials:true,

}));
app.use(express.json());
app.use('/api/auth', authRoutes);


app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});


app.post('/fitness-plan', async (req: Request, res: Response) => {
  console.log("fitness plan is executed");
  try {
    const params: FitnessPlanParams = req.body;
    const result = await generateFitnessPlan(params);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      content: '',
      error: 'Failed to generate fitness plan'
    });
  }
});
app.post('/email',async (req:Request,res:Response)=>{
  console.log("email is executed");
  try {
    const params: EmailParams = req.body;
    const result = await generateEmails(params);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      content: '',
      error: 'Failed to generate email'
    });
  }
})

app.post('/therapy-advice',async (req:Request,res:Response)=>{
  console.log("advce is executed");
  try {
    const params: TherapyParams= req.body;
    const result = await generateTherapyPlan(params);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      content: '',
      error: 'Failed to generate advice'
    });
  }
})

app.post('/code',async (req:Request,res:Response)=>{
  console.log("code is executed");
  try {
    const params: CodeParams = req.body;
    const result = await generateCode(params);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      content: '',
      error: 'Failed to generate code'
    });
  }
})

app.post('/movie',async (req:Request,res:Response)=>{
  console.log("movie is executed");
  try {
    const params: MovieRecParams = req.body;
    const result = await generateMovieRec(params);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      content: '',
      error: 'Failed to generate movie recs'
    });
  }
})

app.post('/diet',async (req:Request,res:Response)=>{
  console.log("diet plan is executed");
  try {
    const params: DietParams = req.body;
    const result = await generateDietPlan(params);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      content: '',
      error: 'Failed to generate diet plan'
    });
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


















