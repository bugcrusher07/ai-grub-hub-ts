import { useState, useEffect } from 'react';
import '../aitools.module.css';
import './fitness.modules.css';
import './fitness_style.css';

export function FitnessPlan2() {
  const [errorLoading, setErrorLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [response, setResponse] = useState(null);

  const [trainingInputMode, setTrainingInputMode] = useState('select');
  const [trainingPreference, setTrainingPreference] = useState('');

  const [activityInputMode, setActivityInputMode] = useState('select');
  const [activityLevel, setActivityLevel] = useState('');

  function generateTable(data) {
    if (
      !data ||
      !data.content ||
      !data.content.content ||
      !data.content.content.weekly_plan
    ) {
      console.error('Weekly plan data is missing or undefined');
      return;
    }

    const weeklyPlan = data.content.content.weekly_plan;
    const htmlDoc =
      document.implementation.createHTMLDocument('Weekly Plan Table');
    const body = htmlDoc.body;

    const table = htmlDoc.createElement('table');
    table.border = '1';

    const thead = htmlDoc.createElement('thead');
    const headerRow = htmlDoc.createElement('tr');
    headerRow.innerHTML = `<th>Day</th><th>Focus</th><th>Exercises</th>`;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = htmlDoc.createElement('tbody');

    Object.keys(weeklyPlan).forEach((day) => {
      const row = htmlDoc.createElement('tr');
      const dayData = weeklyPlan[day];

      const exercisesList =
        dayData.exercises && dayData.exercises.length > 0
          ? dayData.exercises
              .map((ex) => `${ex.name} (${ex.sets} sets, ${ex.reps} reps)`)
              .join('<br>')
          : 'No exercises';

      row.innerHTML = `<td>${day}</td><td>${dayData.focus}</td><td>${exercisesList}</td>`;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    body.appendChild(table);
    document.body.innerHTML = body.innerHTML;
  }

  async function handleSubmit(
    weight,
    age,
    height,
    activity,
    reason,
    preference,
    message
  ) {
    try {
      const fitnessPlanParams = {
        weight,
        age,
        height,
        activity,
        reason,
        preference,
        message,
      };

      const res = await fetch(`http://localhost:3000/api/fitness-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fitnessPlanParams),
      });

      const data = await res.json();
      setResponse(data);
      setErrorLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage(error.message);
      setErrorLoading(false);
    }
  }

  useEffect(() => {
    if (response) {
      console.log('Response received:', response);
    }
  }, [response]);

  function callHandleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const weight = form.get('weight');
    const age = form.get('age');
    const height = form.get('height');
    const reason = form.get('reason');
    const message = form.get('message');
    handleSubmit(
      weight,
      age,
      height,
      activityLevel,
      reason,
      trainingPreference,
      message
    );
  }

  if (response) {
    return <>{generateTable(response)}</>;
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form className="aitools_fitness" onSubmit={callHandleSubmit}>
          <div className="group">
            <div className="left">
              <div className="weight">
                <label htmlFor="weight">Current Bodyweight</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  step="any"
                  min="0"
                  placeholder="Enter Bodyweight in Kg"
                />
              </div>
              <div>
                <label>Height</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  step="any"
                  min="0"
                  placeholder="Enter height in meters"
                />
              </div>
            </div>

            <div className="right">
              <div className="activity">
                <label>Activity Level</label>
                {activityInputMode === 'select' ? (
                  <select
                    className="activity-level"
                    name="activity"
                    value={activityLevel}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'Other') {
                        setActivityInputMode('text');
                        setActivityLevel('');
                      } else {
                        setActivityLevel(val);
                      }
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Sedentary">Sedentary</option>
                    <option value="Lightly Active">Lightly Active</option>
                    <option value="Moderately Active">Moderately Active</option>
                    <option value="Very Active">Very Active</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    className="activity-level"
                    type="text"
                    name="activity"
                    placeholder="Enter custom level"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && activityLevel.length === 0) {
                        setActivityInputMode('select');
                      }
                    }}
                  />
                )}
              </div>
              <div className="age">
                <label>Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  placeholder="Enter your age"
                />
              </div>
            </div>
          </div>

          <div className="center">
            <div className="training">
              <label>Training Style</label>
              {trainingInputMode === 'select' ? (
                <select
                  className="training-style"
                  name="preference"
                  value={trainingPreference}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Other') {
                      setTrainingInputMode('text');
                      setTrainingPreference('');
                    } else {
                      setTrainingPreference(val);
                    }
                  }}
                >
                  <option value="">Select</option>
                  <option value="Strength Training">Strength Training</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Yoga">Yoga</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  className="training-style"
                  type="text"
                  name="preference"
                  placeholder="Enter custom style"
                  value={trainingPreference}
                  onChange={(e) => setTrainingPreference(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Backspace' &&
                      trainingPreference.length === 0
                    ) {
                      setTrainingInputMode('select');
                    }
                  }}
                />
              )}
            </div>
          </div>
          <div className="group2">
            <div className="left2">
              <div>
                <label>Motivation</label>
                <textarea
                  id="Motivation"
                  name="message"
                  placeholder="What is your reason to be fit..."
                />
              </div>
            </div>
            <div className="right2">
              <label>Custom Message</label>
              <textarea
                id="customMessage"
                name="message"
                placeholder="Leave a note for us..."
              />
            </div>
          </div>
          <div className="submit">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
