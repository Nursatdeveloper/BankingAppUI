import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Login from './pages/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
