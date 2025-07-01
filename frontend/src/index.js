// import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './AuthPage/AuthPage';
import reportWebVitals from './reportWebVitals';
import { MainApp } from './front';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { AiTools } from './aitools';
import Dashboard from './Dashboard/Dashboard';
import { PaymentPage } from './payment';
import { Provider } from 'react-redux';
import store from './redux/store';
import { fetchUser } from './authSlice';
import HomePage from './bigBoi/src2/pages/HomePage';
// import EmailResult from './EmailWriter/EmailResult/EmailResult';
import FitnessPlanner from './FitnessPlanner/FitnessPlanner';

const HomePage2 = () => {
  const navigate = useNavigate();

const handleLogin = () => {
    navigate('/auth');
  };

  return (
    < MainApp />
  );
};

// Your dashboard component (the page you want to navigate to after login)
// const DashboardPage2 = () => {
  // return (
    // < AuthApp />
  // );
// };

// Main App component
const App2 = () => {
 const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/fitness" element={<AiTools toolName="fitness" />} />
        <Route path="/email" element={<AiTools toolName="email" />}/>
        <Route path="/advice" element={<AiTools toolName="advice" />}/>
        <Route path="/movie" element={<AiTools toolName="movie" />}/>
        <Route path="/code" element={<AiTools toolName="code" />}/>
        <Route path="/diet" element={<AiTools toolName="diet" />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        {/* <Route path="/emailresult" element={<EmailResult/>} /> */}
      </Routes>
    </Router>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <Provider store={store}>
    <App2 />
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
