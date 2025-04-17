import './dashboard.css';
import { useUser } from './userService';
import { useEffect, useState } from 'react';
// const TopPanel = ()=>{
//   return (
//     <>
//       <div className="navbar_wrapper_dash" >
//           <div></div>
//           <div></div>
//           <div></div>
//       </div>
//     </>
//   )
// }
const getUser= ()=>{
  //  const { user, loading, error } = useUser();
  return (
    <>
      <div>

     </div>
    </>
  )
}
const SubcriptionComponent = ()=>{
  return (
    <>

    </>
  )
}
const HistoryComponent = ()=>{
  return (
    <>

    </>
  )
}
const ChatbotComponent = ()=>{
  return (
    <>

    </>
  )
}
const BookmarkedComponent = ()=>{
  return (
    <>

    </>
  )
}
const AnalyticsComponent = ()=>{
  return (
    <>

    </>
  )
}
const ProfileComponent = ()=>{
  return (
    <>

    </>
  )
}
const Avatar = ()=>{

}

const Credits = ()=>{

}

const TopRightDash = ()=>{
  const {user,loading,error} = useUser();
  return(
    <>
      <div className='dash_comp'>
          <div className='dash_comp_left'>
            <div style={{paddingTop:"50px"}}>
              <Avatar/>
              {user?.username ||"Loading Username"}
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <h3>{user?.email|| "Loading Email"}</h3><a>edit email</a>
            </div>
          </div>
          <div className='dash_comp_right'>
            <Credits/>
            <h4>hello</h4>
          </div>
      </div>
    </>
  )
}

const LeftPanel =()=>{
  const [isOptionOpen,setIsOptionOpen] = useState(false);
  function onOptionClick(e){

  }
    return(
      <>
        <div className="left_tab_dash" >
          <h2 style={{color:"white",}}>AI_HUB</h2>
          <div className='dashboard_wrapper'>
            <div className="dashboard_heading">Dashboard</div>
            <div className='dashboard_container'>
            <div><button>Profile & Settings</button></div>
            <div><button>Subscriptions & Billing</button></div>
            <div><button>Recently Used Tools</button></div>
            <div><button>AI_CHATBOT</button></div>
            <div><button>Bookmarked Outputs</button></div>
            <div><button>Analytics</button></div>

            </div>
            <div className="contact_dashboard"><a>Contact Support</a></div>
          </div>
        </div>
      </>
    )
}

const RightPanel = (e)=>{
  const [chosenOption,setChosenOption] = useState(e);
  useEffect(()=>{
    setChosenOption(e);
  },[e])

  const renderComponent = () => {
    switch(chosenOption) {
      case "profile":
        return <ProfileComponent />;
      case "subscription":
        return <SubcriptionComponent />;
      case "history":
        return <HistoryComponent />;
      case "chatbot":
        return <ChatbotComponent />;
      case "bookmarked":
        return <BookmarkedComponent />;
      case "analytics":
        return <AnalyticsComponent />;
      default:
        return <ProfileComponent />;
    }
  }
    return(
      <>
      <div className='right_tab_dash'>
          <div className='top_right_dash'><TopRightDash/></div>
          <div className='bottom_right_dash'>bru2{renderComponent()}</div>
      </div>
      </>
    )
}

const MainBody = ()=>{
    return(
      <>
      <div className='navbar_wrapper_dash'>
       <LeftPanel/>
       <RightPanel/>
      </div>
      </>
    )
}





export const UserDashboard = ()=>{
  return (
    <>
      <MainBody/>
    </>
  )
}