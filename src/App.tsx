import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import User from './models/User';
import Account from './models/Account';
import Notification from './models/Notification';
import Dashboard from './pages/Dashboard';



function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
