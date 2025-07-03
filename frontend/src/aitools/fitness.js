
// export const AiToolsFitness = ()=>{
//   return(
//     <div  style={{display:"flex",justifyContent:"center"}}>
//       <form className="aitools_fitness" action="http://localhost:8080/aitools/fitness" method="get"  >
//         <label>Current Bodyweight</label>
//         <input  name="bw"/>
//         <label>Height</label>
//         <input  name="height"/>
//         <label>Age</label>
//         <input  name="age"/>
//         <label>Any allergies</label>
//         <input name="aa"/>
//         <label>Activity Level</label>
//         <input  name="al"/>
//         <label>Why you want to get fit</label>
//         <input name="reason"/>
//         <label>Training Style</label>
//         <input name="ts"/>
//         <label>Custom Request</label>
//         <input name="cr"/>
//         <input  type="submit" value="submit innit" />
//       </form>
//     </div>
//   )
// }
// import { useState } from 'react';
// // import Head from 'next/head';
// import { Router } from 'react-router-dom';

// export default function FitnessPlan() {
//   const [age, setAge] = useState('');
//   const [weight, setWeight] = useState('');
//   const [plan, setPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   // const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!age || !weight) {
//       setError('Please enter both age and weight');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       const encodedCredentials =btoa("user:password")
//       const response = await fetch(`http://localhost:8080/aitools/fitness?bw=${weight}&age=${age}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Basic ${encodedCredentials}`,
//         },
//         credentials: 'include',
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.errorMessage || 'Failed to generate fitness plan');
//       }

//       setPlan(data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching fitness plan:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const DayPlan = ({ day }) => {
//     const [expanded, setExpanded] = useState(false);

//     return (
//       <div className="mb-6 border rounded-lg overflow-hidden">
//         <div
//           className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
//           onClick={() => setExpanded(!expanded)}
//         >
//           <div>
//             <h3 className="text-lg font-bold">{day.day}</h3>
//             <p className="text-sm font-medium text-gray-700">{day.focus}</p>
//           </div>
//           <button className="text-blue-600">
//             {expanded ? 'Hide Details' : 'Show Details'}
//           </button>
//         </div>

//         {expanded && (
//           <div className="p-4">
//             {day.warmup && day.warmup.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="font-semibold mb-2">Warm-up</h4>
//                 <ul className="list-disc pl-5">
//                   {day.warmup.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {day.exercises && day.exercises.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="font-semibold mb-2">Exercises</h4>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full border-collapse">
//                     <thead>
//                       <tr className="bg-gray-50">
//                         <th className="p-2 border text-left">Exercise</th>
//                         <th className="p-2 border text-left">Sets</th>
//                         <th className="p-2 border text-left">Reps</th>
//                         <th className="p-2 border text-left">Rest</th>
//                         <th className="p-2 border text-left">Notes</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {day.exercises.map((exercise, index) => (
//                         <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                           <td className="p-2 border">{exercise.name}</td>
//                           <td className="p-2 border">{exercise.sets}</td>
//                           <td className="p-2 border">{exercise.reps}</td>
//                           <td className="p-2 border">{exercise.rest || '-'}</td>
//                           <td className="p-2 border">{exercise.notes || '-'}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {day.cooldown && day.cooldown.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="font-semibold mb-2">Cool-down</h4>
//                 <ul className="list-disc pl-5">
//                   {day.cooldown.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {day.nutrition && (
//               <div>
//                 <h4 className="font-semibold mb-2">Nutrition Tip</h4>
//                 <p>{day.nutrition}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <h1>
//         <title>Personalized Fitness Plan</title>
//         <meta name="description" content="Generate a personalized 7-day fitness plan" />
//       </h1>

//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="text-3xl font-bold text-center mb-8">Personalized Fitness Plan</h1>

//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
//             <div className="flex-1 min-w-[200px]">
//               <label htmlFor="age" className="block mb-2 font-medium">
//                 Age
//               </label>
//               <input
//                 id="age"
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your age"
//               />
//             </div>
//             <div className="flex-1 min-w-[200px]">
//               <label htmlFor="weight" className="block mb-2 font-medium">
//                 Weight (in kg)
//               </label>
//               <input
//                 id="weight"
//                 type="number"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your weight"
//               />
//             </div>
//             <div className="w-full flex justify-end">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
//               >
//                 {loading ? 'Generating...' : 'Generate Plan'}
//               </button>
//             </div>
//           </form>

//           {error && (
//             <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
//               {error}
//             </div>
//           )}
//         </div>

//         {plan && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-6">Your 7-Day Workout Plan</h2>

//             <div className="space-y-4">
//               {plan.weeklyPlan.map((day, index) => (
//                 <DayPlan key={index} day={day} />
//               ))}
//             </div>

//             {plan.generalNotes && (
//               <div className="mt-8 p-4 bg-blue-50 rounded">
//                 <h3 className="text-lg font-bold mb-2">General Notes</h3>
//                 <p>{plan.generalNotes}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';

export default function FitnessPlan() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for development/testing - will be replaced by API response in production
  const mockData = {
    weeklyPlan: [
      {
        day: "Monday",
        focus: "Strength Training - Upper Body",
        warmup: ["5 minutes of light cardio (e.g., jogging in place, jumping jacks)", "Arm circles (forward and backward)"],
        exercises: [
          {
            name: "Bench Press",
            sets: 3,
            reps: "8-12",
            rest: "60 seconds",
            notes: "Focus on proper form; consider dumbbells if bench press is unavailable"
          },
          // Other exercises...
        ],
        cooldown: ["Static stretches for chest, back, shoulders, and arms", "Deep breathing exercises"],
        nutrition: "Focus on protein intake to support muscle recovery (e.g., lean meats, eggs, protein shake)."
      },
      // Other days...
    ],
    generalNotes: "Listen to your body and adjust the intensity and volume as needed. Consult with a healthcare professional before starting any new exercise program."
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!age || !weight) {
      setError('Please enter both age and weight');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // For development testing, use mock data
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          setPlan(mockData);
          setLoading(false);
        }, 1000);
        return;
      }

      // Production API call
      const encodedCredentials = btoa("manman:manman2");
      const response = await fetch(`http://localhost:8080/aitools/fitness?bw=${weight}&age=${age}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || 'Failed to generate fitness plan');
      }

      // Parse the response text - handling the case where it might be a JSON string
      const responseText = await response.text();
      let data;

      try {
        // If it's a JSON string or contains a JSON string with surrounding text
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          data = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No valid JSON found in response');
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Invalid response format from server');
      }

      setPlan(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching fitness plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const DayPlan = ({ day }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="mb-6 border rounded-lg overflow-hidden">
        <div
          className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div>
            <h3 className="text-lg font-bold">{day.day}</h3>
            <p className="text-sm font-medium text-gray-700">{day.focus}</p>
          </div>
          <button className="text-blue-600">
            {expanded ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {expanded && (
          <div className="p-4">
            {day.warmup && day.warmup.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Warm-up</h4>
                <ul className="list-disc pl-5">
                  {day.warmup.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {day.exercises && day.exercises.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Exercises</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 border text-left">Exercise</th>
                        <th className="p-2 border text-left">Sets</th>
                        <th className="p-2 border text-left">Reps</th>
                        <th className="p-2 border text-left">Rest</th>
                        <th className="p-2 border text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.exercises.map((exercise, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-2 border">{exercise.name}</td>
                          <td className="p-2 border">{exercise.sets}</td>
                          <td className="p-2 border">{exercise.reps}</td>
                          <td className="p-2 border">{exercise.rest || '-'}</td>
                          <td className="p-2 border">{exercise.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {day.cooldown && day.cooldown.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Cool-down</h4>
                <ul className="list-disc pl-5">
                  {day.cooldown.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {day.nutrition && (
              <div>
                <h4 className="font-semibold mb-2">Nutrition Tip</h4>
                <p>{day.nutrition}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Personalized Fitness Plan</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="age" className="block mb-2 font-medium">
                Age
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your age"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="weight" className="block mb-2 font-medium">
                Weight (in kg)
              </label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your weight"
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? 'Generating...' : 'Generate Plan'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {plan && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Your 7-Day Workout Plan</h2>

            <div className="space-y-4">
              {plan.weeklyPlan.map((day, index) => (
                <DayPlan key={index} day={day} />
              ))}
            </div>

            {plan.generalNotes && (
              <div className="mt-8 p-4 bg-blue-50 rounded">
                <h3 className="text-lg font-bold mb-2">General Notes</h3>
                <p>{plan.generalNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}