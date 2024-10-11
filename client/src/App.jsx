// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConnectGitHubButton from './components/ConnnectGitHubButton';
import Dashboard from './components/Dashboard';
import Success from './components/Success';
import SomeComponent from './components/SomeComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<ConnectGitHubButton />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path = "/success" element = {<Success />} />
      <Route path = "/pull-requests" element = {<SomeComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
