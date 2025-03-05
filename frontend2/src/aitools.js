import './aitools.modules.css';
import { Logo, MenuFront } from './front';
import { AiToolsEmail } from './aitools/email';
import { AiToolsFitness } from './aitools/fitness';
import FitnessPlan from './aitools/fitness';
import { FitnessPlan2 } from './aitools/fitness2';

const AiToolsNavBar =()=>{

  return(
            <div  style={{
                  display: "grid",marginBottom:"15px",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  }}>
                  <div style={{ justifySelf: "start",color:"white" }}><Logo/></div>
                  <div ><h2>AI innit</h2></div>
                  <div  style={{ justifySelf: "end" }}>
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





export const AiTools =()=>{
  return(
    <div>
    <AiToolsNavBar/>
    <HoverNavbar/>
    {/* <AiToolsFitness/> */}
    {/* <FitnessPlan/> */}
    <FitnessPlan2/>
    {/* <AiToolsEmail /> */}
    </div>
  )
}