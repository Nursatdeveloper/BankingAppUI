import React, { useEffect, useState } from 'react';
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
  const [id, setId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  useEffect(()=>{
    console.log(id)
    console.log(token)
  },)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} setId={setId} setToken={setToken}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setId={setId} setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />
          {/*Production: <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn}/>}/>*/}
          <Route path="/dashboard" element={<Dashboard setLogout={setLoggedIn} id={id} token={token}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
