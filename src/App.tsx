import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Register from './pages/Register';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={loggedIn ? <Home/> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
