import { useState } from "react";

export const AiToolsDietPlan = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Available dietary preferences
  const dietaryPreferences = [
    "Vegetarian", "Vegan", "Pescatarian", "Gluten-Free", "Dairy-Free", "Keto", "Paleo", "Low-Carb", "Low-Fat", "Mediterranean"
  ];

  // Available health goals
  const healthGoals = [
    "Weight Loss", "Weight Gain", "Muscle Building", "Improved Digestion", "Better Energy Levels", "Heart Health", "Diabetes Management", "General Wellness"
  ];

  function handleFormSubmission(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const params = {
      age: form.get("age"),
      gender: form.get("gender"),
      weight: form.get("weight"),
      height: form.get("height"),
      activityLevel: form.get("activityLevel"),
      dietaryPreferences: Array.from(form.getAll("dietaryPreferences")),
      healthGoals: Array.from(form.getAll("healthGoals")),
      allergies: form.get("allergies"),
      preferredCuisines: form.get("preferredCuisines"),
      mealPreference: form.get("mealPreference"),
      calorieTarget: form.get("calorieTarget")
    };
    handleSubmit(params);
  }

  async function handleSubmit(params) {
    setIsLoading(true);
    try {
      const res = await fetch('/api/diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Fetch error", error);
      setResponse({ error: "Failed to generate diet plan" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      {!response ? (
        <div className="diet-form-container">
          <h1>Personalized Diet Plan Generator</h1>
          <p>Answer a few questions, and we'll create a diet plan tailored to your needs!</p>

          <form onSubmit={handleFormSubmission} className="aitools_diet_plan">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                placeholder="e.g., 25"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" required>
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                name="weight"
                type="number"
                min="1"
                placeholder="e.g., 70"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                id="height"
                name="height"
                type="number"
                min="1"
                placeholder="e.g., 175"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select id="activityLevel" name="activityLevel" required>
                <option value="">Select your activity level</option>
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="veryActive">Very Active (intense exercise daily)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dietaryPreferences">Dietary Preferences</label>
              <div className="checkbox-group">
                {dietaryPreferences.map(preference => (
                  <div key={preference} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`dietary-${preference.replace(' ', '-').toLowerCase()}`}
                      name="dietaryPreferences"
                      value={preference}
                    />
                    <label htmlFor={`dietary-${preference.replace(' ', '-').toLowerCase()}`}>{preference}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="healthGoals">Health Goals</label>
              <div className="checkbox-group">
                {healthGoals.map(goal => (
                  <div key={goal} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`goal-${goal.replace(' ', '-').toLowerCase()}`}
                      name="healthGoals"
                      value={goal}
                    />
                    <label htmlFor={`goal-${goal.replace(' ', '-').toLowerCase()}`}>{goal}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="allergies">Allergies or Intolerances</label>
              <input
                id="allergies"
                name="allergies"
                type="text"
                placeholder="e.g., nuts, shellfish"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredCuisines">Preferred Cuisines</label>
              <input
                id="preferredCuisines"
                name="preferredCuisines"
                type="text"
                placeholder="e.g., Italian, Indian, Japanese"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mealPreference">Meal Preference</label>
              <select id="mealPreference" name="mealPreference">
                <option value="">No preference</option>
                <option value="3meals">3 Meals a Day</option>
                <option value="4meals">4 Meals a Day</option>
                <option value="5meals">5 Meals a Day</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="calorieTarget">Daily Calorie Target (Optional)</label>
              <input
                id="calorieTarget"
                name="calorieTarget"
                type="number"
                placeholder="e.g., 2000"
              />
            </div>

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? 'Generating Diet Plan...' : 'Get Diet Plan'}
            </button>
          </form>
        </div>
      ) : (
        <div className="diet-plan-response">
          <h2>Your Personalized Diet Plan</h2>
          {response.error ? (
            <div className="error-message">{response.error}</div>
          ) : (
            <>
              <div className="diet-plan-details">
                <h3>Daily Calorie Target: {response.calorieTarget}</h3>
                <h4>Meals:</h4>
                <ul>
                  {response.meals.map((meal, index) => (
                    <li key={index}>
                      <strong>{meal.mealName}:</strong> {meal.description} ({meal.calories} calories)
                    </li>
                  ))}
                </ul>
                <h4>Additional Notes:</h4>
                <p>{response.notes}</p>
              </div>

              <div className="footnote">
                <p>Need adjustments? Update your preferences and generate a new plan.</p>
              </div>
            </>
          )}
          <button onClick={() => setResponse(null)} className="reset-button">
            Generate New Plan
          </button>
        </div>
      )}
    </div>
  );
};