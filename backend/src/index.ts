import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import axios from 'axios';
import { generateFitnessPlan,FitnessPlanParams } from './aitools/fitness';
import { EmailParams,generateEmails } from './aitools/email';
import { AdviceParams,generateAdvice } from './aitools/advice';
import { generateMovieRec, MovieRecParams } from './aitools/movie';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

app.post('/fitness-plan', async (req: Request, res: Response) => {
  console.log("fitness plan is executed ");
  try {
    const params: FitnessPlanParams = req.body;
    const result = await generateFitnessPlan(params);
    res.json(result);
  } catch (error) {
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
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      content: '',
      error: 'Failed to generate email'
    });
  }
})

app.post('/advice',async (req:Request,res:Response)=>{
  console.log("advce is executed");
  try {
    const params: AdviceParams = req.body;
    const result = await generateAdvice(params);
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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


















