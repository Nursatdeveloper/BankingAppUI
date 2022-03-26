import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import User from './models/User';
import Account from './models/Account';
import Notification from './models/Notification';
import Dashboard from './pages/Dashboard';
import AdminProfile from './pages/AdminProfile';



function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(()=>{
    const value = sessionStorage.getItem('isAdmin');
    if(value === 'true'){
      setIsAdmin(true);
    }
  },)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
          {/*Production: <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn}/>}/>*/}
          <Route path="/dashboard" element={<Dashboard setLogout={setLoggedIn} />} />
          <Route path="/admin" element={isAdmin ? <AdminProfile /> : <div>Вы не администратор</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
