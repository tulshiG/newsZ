// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import WordCloud from './Pages/WordCloud';
import Newspapers from './Pages/Newspapers';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
// import SavedHeadlinesPage from './components/SavedHeadlinesPage';
// import { useAuth } from './context/AuthContext';

export default function AppRoutes() {
//   const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/timeline" element={<Timeline items={[]} />} />
      <Route path="/word-cloud" element={<WordCloud />} />
      <Route path="/newspapers" element={<Newspapers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route
        path="/saved-headlines"
        element={currentUser ? <SavedHeadlinesPage /> : <Login />}
      /> */}
    </Routes>
  );
}