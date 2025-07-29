import React from 'react';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;