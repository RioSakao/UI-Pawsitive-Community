'use client'

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupPage from '../../components/signup';
import LoginPage from '../../components/login';

export default function Account() {
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
      {/* Use BrowserRouter and Routes for routing */}
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  </div>
  );
}