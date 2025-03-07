import { ResponseObject } from "../common/common";
import { geminiApi } from "../geminiApi";

export interface DietParams{
  age: string | null;
  gender: string | null;
  weight: string | null;
  height: string | null;
  activityLevel: string | null;
  dietaryPreferences: string;
  healthGoals: string;
  allergies: string | null;
  preferredCuisines: string | null;
  mealPreference: string | null;
  calorieTarget: string | null;
}

export async function generateDietPlan(params:DietParams):Promise<ResponseObject>{
  const prompt:string = `You are an expert nutritionist AI. Your task is to generate a personalized diet plan based on the following user inputs:

1. **Age**: {age}
2. **Gender**: {gender}
3. **Weight**: {weight} kg
4. **Height**: {height} cm
5. **Activity Level**: {activityLevel}
6. **Dietary Preferences**: {dietaryPreferences}
7. **Health Goals**: {healthGoals}
8. **Allergies/Intolerances**: {allergies}
9. **Preferred Cuisines**: {preferredCuisines}
10. **Meal Preference**: {mealPreference}
11. **Calorie Target**: {calorieTarget}

### Instructions:
- Calculate the user's daily calorie needs based on their age, gender, weight, height, and activity level.
- If a calorie target is provided, use it; otherwise, calculate an appropriate target.
- Create a meal plan that aligns with the user's dietary preferences, health goals, and allergies.
- Include meals that reflect the user's preferred cuisines.
- Ensure the meal plan meets the user's meal preference (e.g., 3 meals a day, 4 meals a day).
- Provide a brief explanation of the plan and why it is suitable for the user.
- Return the plan in the following JSON format:

"json
{
  "calorieTarget": "The calculated or provided daily calorie target",
  "meals": [
    {
      "mealName": "Breakfast",
      "description": "A detailed description of the meal",
      "calories": "Calories for this meal"
    },
    {
      "mealName": "Lunch",
      "description": "A detailed description of the meal",
      "calories": "Calories for this meal"
    },
    {
      "mealName": "Dinner",
      "description": "A detailed description of the meal",
      "calories": "Calories for this meal"
    }
  ],
  "notes": "Additional notes or explanations about the diet plan"
} `;
  return geminiApi(prompt);
}