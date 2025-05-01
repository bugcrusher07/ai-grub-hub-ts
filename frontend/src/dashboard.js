import './dashboard.css';
import { useUser } from './userService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubcriptionComponent = () => <></>;
const HistoryComponent = () => <></>;
const ChatbotComponent = () => <></>;
const BookmarkedComponent = () => <></>;
const AnalyticsComponent = () => <></>;
const ProfileComponent = () => <></>;

const Avatar = () => {
  return <div className="avatar-placeholder">[Avatar]</div>;
};

const Credits = ({ User }) => (
  <>
    <div>
      <h3>Tokens : {User.tokens}</h3>
    </div>
    <div>
      <h3>Plan : {User.subscription}</h3>
    </div>
  </>
);

const TopRightDash = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const plan = user?.subscription || null;

  return (
    <div className="dash_comp">
      <div className="dash_comp_left">
        <div className="dash_left_center">
          <Avatar />
          <h2>{user?.username || 'Loading Username'}</h2>
        </div>

        <div className="dash_left_bottom_left">
          <h3>{user?.email || 'Loading Email'}</h3>
          <a href="#">Edit Email</a>
        </div>

        <div className="dash_left_bottom_center">
          <button className="edit-profile-button">Edit Profile</button>
        </div>
      </div>

      <div className="dash_comp_right">
        <div>{user && <Credits User={user} />}</div>
        <button onClick={() => navigate('/buy')}>Buy More</button>
        {plan === 'free' && <button>Go Pro</button>}
        {plan && plan !== 'free' || !plan ? <button>Upgrade</button> : null}
      </div>
    </div>
  );
};

const LeftPanel = () => {
  return (
    <div className="left_tab_dash">
      <h2>AI_HUB</h2>
      <div className="dashboard_wrapper">
        <div className="dashboard_heading"> Dashboard</div>
        <div className="dashboard_container">
          <div><button>Profile & Settings</button></div>
          <div><button>Subscriptions & Billing</button></div>
          <div><button>Recently Used Tools</button></div>
          <div><button>AI_CHATBOT</button></div>
          <div><button>Bookmarked Outputs</button></div>
          <div><button>Analytics</button></div>
        </div>
        <div className="contact_dashboard">
          <a>Contact Support</a>
        </div>
      </div>
    </div>
  );
};

const RightPanel = (e) => {
  const [chosenOption, setChosenOption] = useState(e);
  useEffect(() => {
    setChosenOption(e);
  }, [e]);

  const renderComponent = () => {
    switch (chosenOption) {
      case 'profile': return <ProfileComponent />;
      case 'subscription': return <SubcriptionComponent />;
      case 'history': return <HistoryComponent />;
      case 'chatbot': return <ChatbotComponent />;
      case 'bookmarked': return <BookmarkedComponent />;
      case 'analytics': return <AnalyticsComponent />;
      default: return <ProfileComponent />;
    }
  };

  return (
    <div className="right_tab_dash">
      <div className="top_right_dash"><TopRightDash /></div>
      <div className="bottom_right_dash">{renderComponent()}</div>
    </div>
  );
};

const MainBody = () => (
  <div className="dashboard_wrapper_container">
    <div className="navbar_wrapper_dash">
      <LeftPanel />
      <RightPanel />
    </div>
  </div>
);

export const UserDashboard = () => <MainBody />;
