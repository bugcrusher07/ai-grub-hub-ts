// import './dashboard.css';
import './dashboard.modules.css';
import { useUser } from './userService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
const SubcriptionComponent = () => {
  return <></>;
};
const HistoryComponent = () => {
  return <></>;
};
const ChatbotComponent = () => {
  return <></>;
};
const BookmarkedComponent = () => {
  return <></>;
};
const AnalyticsComponent = () => {
  return <></>;
};
const ProfileComponent = () => {
  return <></>;
};
const Avatar = ({User}) => {
  return <>
  <div className="avatar_placeholder">[Avatar]</div>
  </>;
};

const Credits = ({ User }) => {
  return (
    <>
      <div>
        <h3>Tokens : {User?.tokens || "No user tokens"}</h3>
      </div>
      <div>
        <h3>Plan : {User?.subscription || "No user subscription"}</h3>
      </div>
    </>
  );
};

const TopRightDash = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();
  let plan;
  user?.subscription ? (plan = user.subscription) : (plan = null);
  return (
    <div className="dash_comp">
      <div className="dash_comp_left">
        <div className='comp_left_top'>
            <Avatar User={user} />
            {user?.username || 'Loading Username'}
        </div>
        <div className='comp_left_bottom'>
            <h2>{user?.email || 'Loading Email'}</h2>
            <a style={{color:"black"}}>edit email</a>
        </div>
      </div>
      <div className="dash_comp_right">
        <div>{user && <Credits User={user} />}</div>
        <button onClick={() => {navigate('/buy')}} > Buy More </button>
        {plan === 'free' && <button>Go Pro </button>}
        {plan ? plan !== 'free' : <button>Upgrade</button>}
      </div>
    </div>
  );
};

const LeftPanel = () => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  function onOptionClick(e) {}
  return (
    <>
      <div className="left_tab_dash">
        <h2 className="AI_HUB_heading" style={{ color: 'white' }}>AI_HUB</h2>
        <div className="dashboard_wrapper">
          <div className="dashboard_container">
          <div id="dashboard_heading">Dashboard</div>
             <div><button >Profile & Settings</button></div>
            <div><button >Subscriptions & Billing</button></div>
            <div><button >Recently Used Tools</button></div>
            <div><button >AI_CHATBOT</button></div>
            <div><button >Bookmarked Outputs</button></div>
            <div><button >Analytics</button></div>
          </div>
          <div className="contact_dashboard">
            <a>Contact Support</a>
          </div>
        </div>
      </div>
    </>
  );
};

const RightPanel = (e) => {
  const [chosenOption, setChosenOption] = useState(e);
  useEffect(() => {
    setChosenOption(e);
  }, [e]);

  const renderComponent = () => {
    switch (chosenOption) {
      case 'profile':
        return <ProfileComponent />;
      case 'subscription':
        return <SubcriptionComponent />;
      case 'history':
        return <HistoryComponent />;
      case 'chatbot':
        return <ChatbotComponent />;
      case 'bookmarked':
        return <BookmarkedComponent />;
      case 'analytics':
        return <AnalyticsComponent />;
      default:
        return <ProfileComponent />;
    }
  };
  return (
    <>
      <div className="right_tab_dash">
        <div className="top_right_dash">
          <TopRightDash />
        </div>
        <div className="bottom_right_dash">bru2{renderComponent()}</div>
      </div>
    </>
  );
};

const MainBody = () => {
  return (
    <>
      <div className="navbar_wrapper_dash">
        <LeftPanel />
        <RightPanel />
      </div>
    </>
  );
};

export const UserDashboard = () => {
  return (
    <>
      <MainBody />
    </>
  );
};