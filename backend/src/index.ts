import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import axios from 'axios';
import { generateFitnessPlan } from './aitools/fitness';
import { FitnessPlanParams } from './aitools/fitness';

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


















