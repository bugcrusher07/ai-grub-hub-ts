import { geminiApi } from "../geminiApi";
import { ResponseObject } from "../common/common";



export interface FitnessPlanParams {
  bodyweight: string;
  height: string;
  age: string;
  activityLevel: string;
  trainingStyle: string;
  motivation: string;
  customMessage: string;
}

export async function generateFitnessPlan(params: FitnessPlanParams): Promise<ResponseObject> {
  console.log("fitness is executed");
  const prompt = `Generate a personalized fitness plan in JSON format based on the following user details:

Weight: ${params.bodyweight}
Age: ${params.age}
Height: ${params.height}
Activity Level: ${params.activityLevel}
Training Style: ${params.trainingStyle}
Motivation: ${params.motivation}
Additional Message: ${params.customMessage || 'None'}

Output Requirements:
Create a 7-day fitness plan with the following JSON structure:

{
  "title": "Your Personalized Fitness Plan",
  "subtitle": "Tailored workout plan based on your goals and fitness level",
  "days": [
    {
      "day": 1,
      "title": "Upper Body Strength",
      "exercises": [
        {
          "name": "Push-ups",
          "sets": "3",
          "reps": "8-12",
          "rest": "60s"
        },
        {
          "name": "Bodyweight Squats",
          "sets": "3",
          "reps": "12-15",
          "rest": "45s"
        }
      ]
    }
  ],
  "weekly_plan": {
    "monday": {
      "focus": "Upper Body",
      "exercises": [
        {
          "name": "Push-ups",
          "sets": "3",
          "reps": "8-12"
        }
      ]
    },
    "tuesday": {
      "focus": "Lower Body",
      "exercises": [
        {
          "name": "Squats",
          "sets": "3",
          "reps": "12-15"
        }
      ]
    },
    "wednesday": {
      "focus": "Rest Day",
      "exercises": []
    },
    "thursday": {
      "focus": "Full Body",
      "exercises": [
        {
          "name": "Burpees",
          "sets": "3",
          "reps": "5-8"
        }
      ]
    },
    "friday": {
      "focus": "Cardio",
      "exercises": [
        {
          "name": "Jumping Jacks",
          "sets": "3",
          "reps": "30s"
        }
      ]
    },
    "saturday": {
      "focus": "Strength",
      "exercises": [
        {
          "name": "Planks",
          "sets": "3",
          "reps": "30-60s"
        }
      ]
    },
    "sunday": {
      "focus": "Rest Day",
      "exercises": []
    }
  }
}

Ensure:
1. Generate exactly 7 days in the "days" array (day 1-7)
2. Include both "days" and "weekly_plan" structures for compatibility
3. Tailor exercises to the user's activity level and goals
4. Provide realistic set/rep ranges
5. Include rest days appropriately
6. Return valid, parseable JSON only`;

  return await geminiApi(prompt);
}
