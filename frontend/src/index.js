import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthApp from './auth'
import reportWebVitals from './reportWebVitals';
import { MainApp } from './front';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { AiTools } from './aitools';
import { AiToolsEmail } from './aitools/email';
import { AiToolsAdvice } from './aitools/advice';
import { AiToolsMovieRecommendation } from './aitools/movieRec';
import { AiToolsCodeSolver } from './aitools/code';
import { AiToolsDietPlan } from './aitools/diet';
import { UserDashboard } from './dashboard';
import { PaymentPage } from './payment';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    < MainApp />
  );
};

// Your dashboard component (the page you want to navigate to after login)
const DashboardPage = () => {
  return (
    < AuthApp />
  );
};

// Main App component
const App2 = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<DashboardPage />} />
        <Route path="/fitness" element={<AiTools toolName="fitness" />} />
        <Route path="/email" element={<AiTools toolName="email" />}/>
        <Route path="/advice" element={<AiTools toolName="advice" />}/>
        <Route path="/movie" element={<AiTools toolName="movie" />}/>
        <Route path="/code" element={<AiTools toolName="code" />}/>
        <Route path="/diet" element={<AiTools toolName="diet" />}/>
        <Route path="/dashboard" element={<UserDashboard/>}/>
        <Route path="/payment" element={<PaymentPage/>} />
      </Routes>
    </Router>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   < App2 />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
