import './front.css';
import { useState , useLayoutEffect, useCallback} from 'react';
import AuthApp from './auth';



import React, {  useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BottomSection = ()=> {
  return (
    <div className="footer_wrapper" >
      <div className='footer_body'>
        <div className="bottom_section_bar">
            <h1>Join the AI revolution</h1>
            <div>
                <button id="bottom_section_button1" >SUBSCRIPTION OPTIONS</button>
                <button id="bottom_section_button2">SIGN UP FOR OUR NEWSLETTER</button>
           </div>
         </div>
         <div className="front_bottom_section" style={{backgroundColor:"#0A142F", height:"350px",}} >
              <div className="front_bottom_container">
                 <h3>Navigation</h3>
                 <a>Home</a>
                 <a>About Us</a>
                 <a>What We Do</a>
                 {/* <div className="bottom_tag"></div> */}
              </div>
              <div className="front_bottom_container">
                 <h3>Talk about us</h3>
                 <a>Encouraging Testing</a>
                 <a>Strengthening Advocacy</a>
                 <a>Sharing Information</a>
                 {/* <div className="bottom_tag"></div> */}
             </div>
             <div className="front_bottom_container">
                 <h3>Legal</h3>
                 <a>General Info</a>
                 <a>Privacy Policy</a>
                 <a>Terms Of Service</a>
                 {/* <div className="bottom_tag" ></div> */}
             </div>
          </div>
          <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div className='bottom_tag'></div>
            <div className="front_bottom_bottom" style={{
                  backgroundColor:"#0A142F",
                  display: "grid",marginBottom:"15px",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",marginTop:"40px",
                  gap: "20px", width:"900px"}}>
                  <div style={{ justifySelf: "start",color:"white" }}>AI-Hub</div>
                  <div style={{color:"white"}}><h4>@2025 Lift Media. All Rights Reserved</h4></div>
                  <div  style={{ justifySelf: "end" }}>
                      <a style={{ marginRight: "10px",color:"white",cursor:"pointer" }}>facebook</a>
                      <a style={{ marginRight: "10px",color:"white",cursor:"pointer" }}>twitter</a>
                      <a style={{color:"white",cursor:"pointer" }}>mail</a>
                 </div>
            </div>
          </div>
        </div>
      </div>
  )
}

const ButtonForAI = ()=> {
  const style = {
    backgroundColor:"black",
    width:"200px",
    height:"35px",
    border:"transparent",
    borderRadius:"24px",
    fontFamily:`"arial",sans-sarif`,
    fontSize:"1.2rem",
    fontWeight:"550",
    position:"relative",
    cursor:"pointer",
    color:"white"
  }
  return (
    <button className="div_button" style={style}>Explore</button>
  )
}

const MovingStrip = () => {
  const [textStrip, setTextStrip] = useState(3);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const updateTextStrip = () => {
      if (containerRef.current && contentRef.current) {
        const tempTextStrip = Math.ceil(containerRef.current.offsetWidth / contentRef.current.offsetWidth) + 2;
        setTextStrip(tempTextStrip);
      }
    };

    updateTextStrip();
    window.addEventListener('resize', updateTextStrip);

    return () => window.removeEventListener('resize', updateTextStrip);
  }, []);

  return (
    <div className="ticker_container" ref={containerRef} style={{ backgroundColor: "red", overflow: "hidden" }}>
      <div
        className="container"
        style={{
          height: "40px",
          backgroundColor: "black",
          display: "flex"
        }}
        ref={contentRef}
      >
        {Array(textStrip).fill().map((_, index) => (
          <span
            key={index}
            style={{
              color: "white",
              whiteSpace: "nowrap",
              paddingRight: "130px",
              alignSelf: "center",
          animation: "ticker 6s linear infinite"
            }}
          >
            AI is a highly innovative technology but it should be used and treated as what it really is: A clever tool to amplify human potential
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};


const SearchBar = () => {
return (<div className="search_bar">
  <input></input>
</div>)
}


const logoAddress = "/logoIMG.png"

export const MenuFront = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="front_menu_bar">
    <div className={`menu_bar ${isOpen ? 'change' : ''}`} onClick={toggleBar}>
      <div className="bar1"> </div>
      <div className="bar2"></div>
      <div className="bar3"></div>
      </div>
      <div className={`whole_menu${isOpen?`_visible` : ``}`} >

      <a id="button1" href=""> AI Solutions</a>
       <a href="">Products</a>
       <a href="">Pricing</a>
       <a href="">Subscription</a>
      </div>
     </div>

  );
}


export const Logo = ()=> {
  return (
  <div ><img className="logo_front" src={logoAddress} alt="Brand" /></div>
  )
}

function MidMenuTopBar(){
  return  (
    <div className='mid_menu_bar'>
        <a>Pricing</a>
        <a>Plans</a>
        <a>Products</a>
        <a>Demonstration</a>
        <a>Job</a>
        <a>Lorem</a>
    </div>
  )

}

export  const MainApp = () => {
    const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth');
  };
return(
<div className="front_app" >
<div className="main_Header_Front">
<Logo />
<MidMenuTopBar />
<button id="front_search"  ><img src="/search2.png" alt="Search"></img></button>
<button id="front_signIn" onClick={handleLogin} >SIGN IN</button>
<MenuFront />
</div>
<MovingStrip/>
<div  className='ai_container_wrapper'>
  <div className="ai_container">
  <div style={{zIndex:"0"}} >
    {/* ai letter and email */}
    <img src="/first2.jpg"   />
    <ButtonForAI />
  </div>
<div style={{zIndex:"0"}}>
    {/* fitness plan */}
    <img src="fitfirst.jpg" />
    <ButtonForAI />
  </div>
  <div style={{zIndex:"0"}}>
    {/* solving code issues */}
    <img src="aicode1.jpg" />
    <ButtonForAI />
  </div>
  <div style={{zIndex:"0"}}>
    {/* ai advice */}
    <img src="first2.jpg" />
    <ButtonForAI />
  </div>
  <div style={{zIndex:"0"}}>
    {/*ai movie recommendation */}
    <img src="first3.jpg" />
    <ButtonForAI />

  </div>
  <div style={{zIndex:"0"}}>
    {/* Diet Plan */}
    <img src="first4.jpg" />
    <ButtonForAI />
  </div>
  <div style={{zIndex:"0"}}>
    {/* AI Presentation */}
    <img src="fit2.jpg" />
    <ButtonForAI />

  </div>
  <div style={{zIndex:"0"}}>
    {/* AI resume */}
    <img src="first1.jpg" />
    <ButtonForAI />
  </div>
  </div>
</div>
<BottomSection/>
</div>
)
}