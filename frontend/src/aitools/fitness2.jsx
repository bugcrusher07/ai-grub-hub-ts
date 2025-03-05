import { useState, useEffect } from "react";
import '../aitools.modules.css';
import './fitness.modules.css';

export function FitnessPlan2() {
  const [errorLoading, setErrorLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const aiCredentials = btoa("manman:manman2");

  const [response, setResponse] = useState(null);

function generateTable(data) {
    // Check if the data structure is correct and weekly_plan exists
    if (!data || !data.content || !data.content.content || !data.content.content.weekly_plan) {
        console.error("Weekly plan data is missing or undefined");
        return;
    }

    const weeklyPlan = data.content.content.weekly_plan;

    // Create a new HTML document
    const htmlDoc = document.implementation.createHTMLDocument("Weekly Plan Table");
    const body = htmlDoc.body;

    // Create table element
    const table = htmlDoc.createElement("table");
    table.border = "1";

    // Create table header
    const thead = htmlDoc.createElement("thead");
    const headerRow = htmlDoc.createElement("tr");

    headerRow.innerHTML = `<th>Day</th><th>Focus</th><th>Exercises</th>`;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = htmlDoc.createElement("tbody");

    Object.keys(weeklyPlan).forEach(day => {
        const row = htmlDoc.createElement("tr");
        const dayData = weeklyPlan[day];

        // Check if exercises exist and are not empty
        const exercisesList = dayData.exercises && dayData.exercises.length > 0
            ? dayData.exercises.map(ex => `${ex.name} (${ex.sets} sets, ${ex.reps} reps)`).join("<br>")
            : "No exercises";

        row.innerHTML = `<td>${day}</td><td>${dayData.focus}</td><td>${exercisesList}</td>`;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    body.appendChild(table);

    // Append the new HTML document to the current document's body
    document.body.innerHTML = body.innerHTML;
}
 const handleSubmit = async (weight, age,height,activity,reason,preference,message) => {
  try {
    const fitnessPlanParams={
      weight:weight,
      age:age,
      height:height,
      activity:activity,
      reason:reason,
      preference:preference,
      message:message
    }
    console.log(JSON.stringify(fitnessPlanParams));
    const res = await fetch(`http://localhost:3000/api/fitness-plan`,{
      method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fitnessPlanParams)
    });
    const data = await res.json();
    console.log("Data received from backend:", data); // Log the data
    setResponse(data); // Update the response state
    setErrorLoading(false);
  } catch (error) {
    console.error("Fetch error:", error); // Log the error
    setErrorMessage(error.message);
    setErrorLoading(false);
  }
};

  useEffect(() => {
    if (response) {
      console.log("Response received:", response);
    }
  }, [response]);

  function callHandleSubmit(e){
    e.preventDefault();
    const form = new FormData(e.target);
    let weight = form.get("weight");
    let age = form.get("age");
    let height = form.get("height");
    let activityLevel = form.get("activity");
    let reason = form.get("reason");
    let trainingPreference = form.get("preference");
    let customMessage= form.get("customMessage");
    handleSubmit(weight,age,height,activityLevel,reason,trainingPreference,customMessage);
  };

  // If there's a valid response, display the table
  if (response) {

    return (
      <>
      {generateTable(response)}
      </>)

}else{
  // If there's no response yet, display the form
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form className="aitools_fitness" onSubmit={callHandleSubmit}>
        <label>Current Bodyweight</label>
        <input name="weight" />
        <label>Height</label>
        <input name="height" />
        <label>Age</label>
        <input name="age" />
        <label>Activity Level</label>
        <input name="activity" />
        <label>Why you want to get fit</label>
        <input name="reason" />
        <label>Training Style</label>
        <input name="preference" />
        <label>Custom Request</label>
        <input name="customMessage" />
        <input type="submit" value="Submit"  />
      </form>
    </div>
)}
}