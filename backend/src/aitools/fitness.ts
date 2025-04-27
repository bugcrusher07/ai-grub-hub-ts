import { geminiApi } from "../geminiApi";
import { ResponseObject } from "../common/common";

export interface FitnessPlanParams {
  weight: string;
  age: number;
  height: string;
  activity: string;
  reason?: string;
  preference?: string;
  message?: string;
}

export async function generateFitnessPlan(params: FitnessPlanParams): Promise<ResponseObject> {
  console.log("fitnss is executed");
  const prompt = `Generate a personalized fitness plan in JSON format based on the following user details:
Weight: ${params.weight}
Age: ${params.age}
Height: ${params.height}
Activity Level: ${params.activity}
Reason for Fitness Plan: ${params.reason || 'Not specified'}
Training Style Preference: ${params.preference || 'Not specified'}
Additional Message: ${params.message || 'None'}

Output Requirements:
1. Provide a weekly workout schedule in JSON
2. Include exercises with scientifically-backed recommendations
3. Specify set and rep ranges
4. Tailor to user's age, activity level, and goals
5. Ensure valid, parseable JSON format
function generateTable(data) {
            const tableBody = document.querySelector('#fitnessTable tbody');
            const weeklyPlan = data.content.weekly_plan;

            for (const [day, details] of Object.entries(weeklyPlan)) {
                const row = document.createElement('tr');
                const exercises = details.exercises.map(exercise => "{exercise.name} ({exercise.sets} sets x {exercise.reps} reps)").join("<br>");

                row.innerHTML ="
                    <td><strong>{day.charAt(0).toUpperCase() + day.slice(1)}</strong></td>
                    <td>{details.focus}</td>
                    <td>{exercises || "Rest Day"}</td>
                ";
                tableBody.appendChild(row);
            }
        }I am using this function in frontend to display the table so send data accordingly.
`;

  return await geminiApi(prompt);
}