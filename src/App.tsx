import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Register from './pages/Register';
import User from './models/User';
import Account from './models/Account';
import Notification from './models/Notification';


function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    userId:0,
    firstName:"",
    lastName:"",
    iin:"",
    birthdate:"",
    phoneNumber:"",
    gender:"",
    cardNumber:"",
    role:"",
  });
  const [account, setAccount] = useState<Account[]>([]);
  const [notification, setNotification] = useState<Notification[]>([])
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={loggedIn ? <Home/> : <Login setLoggedIn={setLoggedIn} setUser={setUser} setAccount={setAccount} setNotification={setNotification}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} setAccount={setAccount} setNotification={setNotification}/>} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={<Profile user={user} accounts={account} notifications={notification} />}  />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
