// import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './authPage/AuthPage';
import reportWebVitals from './reportWebVitals';
import { MainApp } from './front';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
// import { AiTools } from './aitools';
// import {AiTools} from './aitools'
import Dashboard from './Dashboard/Dashboard';
import { PaymentPage } from './payment';
import { Provider } from 'react-redux';
import store from './redux/store';
import { fetchUser } from './authSlice';
// import HomePage from './bigBoi/src2/pages/HomePage';
import HomePage from './mainComponents/pages/HomePage'
import { useAuth } from './useAuth';
import ScrollToTop from './scrollToTop';
import FitnessPlanner from './aitools/FitnessPlanner/FitnessPlanner';
import EmailWriter from './aitools/EmailWriter/EmailWriter';
import CodeAdvice from './aitools/CodeAdvice/CodeAdvice';
import AITherapist from './aitools/AITherapist/AITherapist'

const App = () => {
 const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/fitness" element={<FitnessPlanner />} />
        <Route path="/email" element={<EmailWriter/>}/>
        <Route path="/aitherapist" element={<AITherapist/>}/>
        <Route path="/code" element={<CodeAdvice />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        {/* <Route path="/emailresult" element={<EmailResult/>} /> */}
      </Routes>
    </Router>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <Provider store={store}>
    <App />
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
