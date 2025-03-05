// import { useState, useEffect } from "react";
// import '../aitools.modules.css';
// import './fitness.modules.css';

// export function FitnessPlan2() {
//   const [errorLoading, setErrorLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [response, setResponse] = useState(null);
//   const aiCredentials = btoa("manman56:manman2");

//   const handleSubmit = async (bw, age) => {
//     try {
//       const res = await fetch(`http://localhost:8080/aitools/fitness?bw=${bw}&age=${age}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Basic ${aiCredentials}`
//         },
//         credentials: 'include',
//       });
//       const data = await res.json();
//       setResponse(data);
//       setErrorLoading(false);
//     } catch (error) {
//       setErrorMessage(error.message);
//       setErrorLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (response) {
//       // Perform any side effects when response changes
//       console.log("Response received:", response);
//     }
//   }, [response]);
//    function callHandleSubmit(e){
//             e.preventDefault();
//             handleSubmit("90kg", "25");
//     }

//   if (response) {
//     return (
//       <div>
//         <table>
//           <caption>This table is not for sale</caption>
//           <thead>
//             <tr>
//               <th scope="col">Day</th>
//               <th scope="col">Monday</th>
//               <th scope="col">Tuesday</th>
//               <th scope="col">Wednesday</th>
//               <th scope="col">Thursday</th>
//               <th scope="col">Friday</th>
//               <th scope="col">Saturday</th>
//               <th scope="col">Sunday</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.from({ length: 7 }).map((_, index) =>{
//               console.log("arrays are being constructed")
//               return (
//               <tr key={index}>
//                 <th scope="row">Exercise - {index + 1}</th>
//                 <th></th>
//                 <th></th>
//                 <th></th>
//                 <th></th>
//                 <th></th>
//                 <th></th>
//                 <th></th>
//               </tr>
//               )
//   })}
//           </tbody>
//         </table>
//       </div>
//     );

//   } else {
//     return (
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <form className="aitools_fitness">
//           <label>Current Bodyweight</label>
//           <input name="bw" />
//           <label>Height</label>
//           <input name="height" />
//           <label>Age</label>
//           <input name="age" />
//           <label>Any allergies</label>
//           <input name="aa" />
//           <label>Activity Level</label>
//           <input name="al" />
//           <label>Why you want to get fit</label>
//           <input name="reason" />
//           <label>Training Style</label>
//           <input name="ts" />
//           <label>Custom Request</label>
//           <input name="cr" />
//           <input type="submit" value="submit innit" onClick={callHandleSubmit} />
//         </form>
//       </div>
//     );
//   }
// }
import { useState, useEffect } from "react";
import '../aitools.modules.css';
import './fitness.modules.css';

export function FitnessPlan2() {
  const [errorLoading, setErrorLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [response, setResponse] = useState(null);
  const aiCredentials = btoa("manman:manman2");

 const handleSubmit = async (weight, age,height,allergies,activity,reason,preference,message) => {
  try {
    const res = await fetch(`http://localhost:8080/aitools/fitness?weight=${weight}&age=${age}&height=${height}&allergies=${allergies}&acitivity=${activity}&reason=${reason}&preference=${preference}&message=${message}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${aiCredentials}`
      },
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
    let allergies = form.get("allergies");
    let activityLevel = form.get("activity");
    let reason = form.get("reason");
    let trainingPreference = form.get("preference");
    let customMessage= form.get("customMessage");
    handleSubmit(weight,age,height,allergies,activityLevel,reason,trainingPreference,customMessage); // Hardcoded values for now
  };

  // If there's a valid response, display the table
  if (response) {
    return (
      <div>
        <h2>Your Weekly Fitness Plan</h2>
        <table>
          <caption>This table is not for sale</caption>
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Focus</th>
              <th scope="col">Warmup</th>
              <th scope="col">Exercises</th>
              <th scope="col">Cooldown</th>
              <th scope="col">Nutrition</th>
            </tr>
          </thead>
          <tbody>
            {response.weeklyPlan.map((dayPlan, index) => (
              <tr key={index}>
                <td>{dayPlan.day}</td>
                <td>{dayPlan.focus}</td>
                <td>
                  <ul>
                    {dayPlan.warmup.map((warmup, i) => (
                      <li key={i}>{warmup}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {dayPlan.exercises.map((exercise, i) => (
                      <li key={i}>
                        <strong>{exercise.name}</strong> - {exercise.sets} sets of {exercise.reps} reps, rest {exercise.rest}. {exercise.notes}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {dayPlan.cooldown.map((cooldown, i) => (
                      <li key={i}>{cooldown}</li>
                    ))}
                  </ul>
                </td>
                <td>{dayPlan.nutrition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h3>General Notes</h3>
          <p>{response.generalNotes}</p>
        </div>
      </div>
    );
  }

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
        <label>Any allergies</label>
        <input name="allergies" />
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
  );
}