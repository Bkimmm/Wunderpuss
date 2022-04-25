import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import jobs from './components/'
import JobDashboard from './components/JobDashboard.js';
import Dashboard from './components/Dashboard.js';
import LoginTemplate from './components/LoginTemplate';
import SignUpTemplate from './components/SignUpTemplate.js';
import ApplicationTemplate from './components/ApplicationTemplate';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LoginTemplate />} />
        <Route path='/signup' element={<SignUpTemplate />} />
        <Route path='/applications' element={<ApplicationTemplate />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/jobs' element={<JobDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
