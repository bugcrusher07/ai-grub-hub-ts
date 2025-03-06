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
        <Route path="/aitools" element={<AiTools/>} />
        <Route path="/email" element={<AiToolsEmail/>}/>
        <Route path="/advice" element={<AiToolsAdvice/>}/>
        <Route path="/movie" element={<AiToolsMovieRecommendation/>}/>
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
