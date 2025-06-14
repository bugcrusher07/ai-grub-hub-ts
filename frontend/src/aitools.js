import './aitools.modules.css';
import { Logo, MenuFront } from './front';
import { AiToolsEmail } from './aitools/email';
import { AiToolsFitness } from './aitools/fitness';
import FitnessPlan from './aitools/fitness';
import { FitnessPlan2 } from './aitools/fitness2';
import { UserProfile } from './front';
import { getUser,getUserJson } from './front';
import { useInsertionEffect, useState,useEffect } from 'react';
import { useUser } from './userService';
import { AiToolsAdvice } from './aitools/advice';
import { AiToolsMovieRecommendation } from './aitools/movieRec';
import { AiToolsCodeSolver } from './aitools/code';
import { AiToolsDietPlan } from './aitools/diet';
import FitnessPlanner from './FitnessPlanner/FitnessPlanner';
import EmailWriter from './EmailWriter/EmailWriter';


const AiToolsNavBar =()=>{
  console.log("use effect is rendering")
  // const [userId,setUserId]=useState(null);
  const { user, loading, error } = useUser();


  return(
            <div  style={{
                  display: "grid",marginBottom:"15px",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  }}>
                  <div style={{ justifySelf: "start",color:"white" }}><Logo/></div>
                  <div ><h2>AI innit</h2></div>
                  <div  style={{ justifySelf: "end" }}>
                     {loading ? (<div>Loading...</div>  ) : error ? (
                  <div>Error: {error}</div>
                   ) : (
                  <UserProfile User={user} />    )}
                    <MenuFront/>
                 </div>
                 </div>
  )
}

const HoverNavbar = () => {
  return (
    <>
      <div className="hover-area" />
      <nav className="side-navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

    </>
  );
};





export const AiTools =({toolName})=>{
    const renderTool = () => {
    switch (toolName) {
      case "fitness":
        return <FitnessPlanner/>;
      case "email":
        return <EmailWriter/>;
      case "advice":
        return <AiToolsAdvice />;
      case "movie":
        return <AiToolsMovieRecommendation />;
      case "code":
        return <AiToolsCodeSolver/>
      case "diet":
        return <AiToolsDietPlan/>
      default:
        return <div>Select a tool</div>; // Fallback UI
    }
  };
  return(
    <div>
    <AiToolsNavBar/>
    {/* <HoverNavbar/> */}
    {/* <AiToolsFitness/> */}
    {/* <FitnessPlan/> */}
    {renderTool()}
    {/* <AiToolsEmail /> */}
    </div>
  )
}