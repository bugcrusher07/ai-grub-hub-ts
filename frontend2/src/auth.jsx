import './auth.css';
import React, { useRef, useEffect, useState } from 'react';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


 export const MenuBLogo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <div className={`menu_bar ${isOpen ? 'change' : ''}`}     onClick={toggleBar}>
      <div className="bar1"></div>
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
};

export const SignInMenu = () => {
  const [currentAuth,setCurrentAuth] = useState(true);
  const changeSign = () =>{
    setCurrentAuth(!currentAuth);
  }

  if(currentAuth == true){
  return(

<form id="form">
  <div className="header_auth" id="first"> Sign In</div>
      <div className="first_div_input">
        <label for="email-input">
          <span>@</span>
        </label>
        <input type="email" name="email" id="email-input" placeholder="Email" />
      </div>
      <div>
        <label for="password-input">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg>
        </label>
        <input type="password" name="password" id="password-input" placeholder="Password" />
      </div>

      <button type="submit">Login</button>
       <p>New here? <a id="func_link" onClick={changeSign}>Create an Account</a></p>
    </form>
  )}else {
    return(

<form id="form">
  <div className="header_auth" id="second"> Sign Up</div>
      <div>
        <label for="firstname-input">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>
        </label>
        <input type="text" name="firstname" id="firstname-input" placeholder="Firstname" />
      </div>
      <div>
        <label for="email-input">
          <span>@</span>
        </label>
        <input type="email" name="email" id="email-input" placeholder="Email" />
      </div>
      <div>
        <label for="password-input">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg>
        </label>
        <input type="password" name="password" id="password-input" placeholder="Password" />
      </div>
      <div>
        <label for="repeat-password-input">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg>
        </label>
        <input type="password" name="repeat-password" id="repeat-password-input" placeholder="Confirm Password" />
      </div>
      <button type="submit">Signup</button>
      <p>Already have an Account? <a id="func_link" onClick={changeSign}>login</a> </p>
    </form>
    )
  }
}



export default function AuthApp() {

  const inlineCss = {
    height:"10vh",
    width: "100vw",
  }
return (
  <body style={{overflow:"hidden"}}>
  <div className="body" >
  <div className="header" style={inlineCss}>
    <div> <a href="https://www.amazon.in/" rel="noopener noreferrer">
          <img src="/logoIMG.png" alt="LOGO" style={{ width: '70px', height: '10vh' }} />
        </a></div>
    <div><h1>innit</h1></div>
    <div className="menuAuth"><MenuBLogo /></div>
  </div>

  <div className="main" >
    <div className="signIn">
      <div className="mainMenu">
        <SignInMenu />
      <div>Google and Github SignIn </div>
        </div>

      </div>


  </div>

</div>
</body>
)
}