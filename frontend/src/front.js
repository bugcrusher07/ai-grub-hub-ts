import './front.css';
import { useState , useLayoutEffect, useCallback} from 'react';
import AuthApp from './auth';

import React, {  useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { backgroundBlurriness, temp } from 'three/webgpu';


export const UserProfile = ({ User }) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [date, setDate] = useState(null);
  const [isDetails, setIsDetails] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  // Use useEffect to set state values based on props
  useEffect(() => {
  if (!User) {
    setIsDetails(false);
    return;
  }

  // Set email, username, and date
  setEmail(User.email || null);
  setUsername(User.username || null);
  setDate(User.createdAt || null);

  // Check if all required fields are valid
  const allFieldsValid = User.email && User.username && User.createdAt;
  setIsDetails(allFieldsValid);
}, [User]);

  const buttonStyle = {
    height:"40px",
    width: "40px",
    backgroundColor:"green",
    cursor:"pointer"
  };
  console.log(`emails is ${email} date is ${date} username is ${username} isDetails ${isDetails}`)

  return (
    <div className="bigbruh">
      <button
        style={buttonStyle}
        onClick={() => setIsClicked(prevState => !prevState)}
      ></button>
      {isClicked && isDetails && (
        <div className="user_detail_front">
          <div>{email}</div>
          <div>{username}</div>
          <div>{date}</div>
        </div>
      )}
    </div>
  );
};

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
            AI is a highly innovative technology but it should be used and treated as what it really is, a clever tool to amplify human potential
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


  const MySVG = ({handleClick}) => {
    return(
<>
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width="47"
      height="47"
      version="1.1"
      viewBox="0 0 1200 1200"
      onClick={handleClick}
      style={{ backgroundColor: 'transparent' ,marginLeft:"15px",cursor:"pointer",border:"none",padding:"none"}}
    >
      <path d="m900 286.8c-84-84-194.4-129.6-313.2-129.6-117.6 0-229.2 45.602-313.2 129.6-172.8 172.8-172.8 453.6 0 625.2 84 84 194.4 129.6 313.2 129.6 117.6 0 229.2-45.602 313.2-129.6 172.8-171.6 172.8-452.4 0-625.2zm-10.801 615.6c-80.398 80.398-188.4 124.8-302.4 124.8s-222-44.398-302.4-124.8c-166.8-166.8-166.8-438 0-604.8 80.398-80.398 188.4-124.8 302.4-124.8s222 44.398 302.4 124.8c166.8 166.8 166.8 438 0 604.8zm-174-420-121.2 121.2 121.2 121.2c2.3984 2.3984 2.3984 7.1992 0 10.801-1.1992 1.1992-3.6016 2.3984-4.8008 2.3984-2.3984 0-3.6016-1.1992-4.8008-2.3984l-122.4-121.2-121.2 121.2c-1.1992 1.1992-3.6016 2.3984-4.8008 2.3984-2.3984 0-3.6016-1.1992-4.8008-2.3984-2.3984-2.3984-2.3984-7.1992 0-10.801l121.2-121.2-122.4-121.2c-2.3984-2.3984-2.3984-7.1992 0-10.801 2.3984-2.3984 7.1992-2.3984 10.801 0l121.2 121.2 121.2-121.2c2.3984-2.3984 7.1992-2.3984 10.801 0 2.4023 3.6016 2.4023 8.4023 0 10.801z" />
  </svg>
</>
    )
  }
  export default MySVG;


const SearchBar = ({ onClick }) => {
  // Define style constants first before using them in useState
  const noInputStyle = {
    display: "none",
  };
  const inputStyle = {
    display: "block",
  };

  // Now use the constants in useState
  const [style, setStyle] = useState(noInputStyle);
  const [input, setInput] = useState("");
  const [hasResults, setHasResults] = useState(true);

  // Function to update the `hasResults` state
  const returnQueryResult = (filteredTools) => {
    setHasResults(filteredTools.length > 0);
  };

  return (
    <div className="search_bar_wrapper_front">
      <div className="input_wrapper_front">
        <input
          className="input_search_front"
          onChange={(e) => {
            setInput(e.target.value);
            setStyle(e.target.value ? inputStyle : noInputStyle);
          }}
        />
        <MySVG handleClick={onClick} />
      </div>
      <div className="search_result_wrapper">
        <div
          className="search_results_front"
          style={{
            ...style,
            backgroundColor: hasResults ? "rgba(0, 0, 0, 0.59)" : "transparent",
            backgroundImage: hasResults ? "none" : "url('ai_future.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <AiToolsContainer
            searchQuery={input}
            shouldFilter={true}
            returnQueryResult={returnQueryResult}
            isSearchBar={true}
          />
        </div>
      </div>
    </div>
  );
};

const logoAddress = "/logoIMG.png"




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
};

const AiToolsContainer = ({ searchQuery, shouldFilter, returnQueryResult,isSearchBar}) => {
  const tools = [
    { name: "letter", img: "/first2.jpg" },
    { name: "fitness", img: "fitfirst.jpg" },
    { name: "code", img: "aicode1.jpg" },
    { name: "advice", img: "first2.jpg" },
    { name: "movie", img: "first3.jpg" },
    { name: "diet", img: "first4.jpg" },
    { name: "presentation", img: "fit2.jpg" },
    { name: "resume", img: "first1.jpg" },
  ];
  const searchBarStyle={zIndex:"0",marginRight:"12px",marginBottom:"5px"}
  const normalStyle={zIndex:"0"}
  let divEleStyle;
  if(isSearchBar==true){
    divEleStyle=searchBarStyle
  }else{divEleStyle=normalStyle}

  if (searchQuery == null) {
    searchQuery = "_";
  }

  const filteredTools = shouldFilter
    ? tools.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  // Only call returnQueryResult if it exists
  if (typeof returnQueryResult === 'function') {
    returnQueryResult(filteredTools);
  }

  return (
    <div className="ai_container_wrapper">
      {filteredTools.length > 0 ? (
        <div className="ai_container">
          {filteredTools.map((tool, index) => (
            <div key={index} style={divEleStyle}>
              <img src={tool.img} alt={tool.name} />
              <ButtonForAI />
            </div>
          ))}
        </div>
      ) : (
        <div className="no_results_message">

          <h1>No results found for "{searchQuery}"</h1>
        </div>
      )}
    </div>
  );
};

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

export async function getUser(){
  try{
  const response = await fetch('http://localhost:3000/api/api/auth/me',{
    credentials:'include'
  })
  console.log("getUser try res ",response);
  return response;
  }catch(error){
    console.log("getUser catch ", error)
    return null;
  }
}
export  const MainApp = () => {
    const navigate = useNavigate();
    const [search,setSearch]= useState(false)
    const [isNotSignedIn,setIsNotSignedIn]=useState(false);
    const [userProfileProp,setUserProfileProp]=useState(null)
    useEffect(()=>{
    async function fetchingUser(){
    try{
    const isExistingUser = getUser();

    // This is what isExistingUser looks like
    // {"_id": "67d306073239297e7d78c6eb",
    // "username": "bigman4",
    // "email": "bigman4@gmail.com",
    // "createdAt": "2025-03-13T16:21:27.020Z",
    // "updatedAt": "2025-03-13T16:21:27.020Z",
    // "__v": 0}


     if ( isExistingUser.status==401 ){
         setIsNotSignedIn(true);

     }else if(isExistingUser.status==200){
          setIsNotSignedIn(false);
          const data = await isExistingUser.json();
          setUserProfileProp(data);
     }

    }catch(error){
      console.log("error is ",error);
    }}
    fetchingUser();
    },[])

  function handleSearchClick(){
    setSearch(true);
  }
  function closeSearch(){
    setSearch(false)
  }

  const handleLogin = () => {
    navigate('/auth');
  };
   const dummyReturnQueryResult = () => {
    // This function doesn't need to do anything
  };
  console.log("userProfileProp is ",userProfileProp)
return(
<div className="front_app" >
<div className="main_Header_Front">
<Logo />
<MidMenuTopBar />
<button id="front_search" onClick={handleSearchClick} ><img src="/search2.png" alt="Search"></img></button>
{isNotSignedIn==true?<button id="front_signIn" onClick={handleLogin} >SIGN IN</button>: <UserProfile User={userProfileProp}/>  }
{search&& <SearchBar onClick={closeSearch}/>}
<MenuFront />
</div>
<MovingStrip/>
<AiToolsContainer searchQuery={"e"} shouldFilter={false} returnQueryResult={dummyReturnQueryResult}/>
<BottomSection/>
</div>
)
}