

// This is your updated App.jsx file.
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import WordCloud from './Pages/WordCloud';
import Newspapers from './Pages/Newspapers';
// Import the Login and Signup components
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
// import SavedHeadlinesPage from './components/SavedHeadlinesPage';
//  import Newspaper from "./Pages/Newspaper";
// import { useAuth } from './context/AuthContext';
import Save from './Pages/Save';
import Footer  from './components/Footer';
export default function App() {
  // const { currentUser } = useAuth();
  return (
    <>
      {/* body bg/text are controlled in index.css; this container just adds spacing */}
      <div className="min-h-dvh transition-colors duration-300">
        <Navbar />
        <main className="pt-16"> {/* offset for fixed navbar */}
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/timeline" element={<Timeline items={[]} />} />
            <Route path="/word-cloud" element={<WordCloud />} />
            <Route path='/newspapers' element={<Newspapers />} />
            {/* Add the new routes for Login and Signup here */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route
            path="/saved-headlines"
            element={currentUser ? <SavedHeadlinesPage /> : <Login />}
          /> */}
            {/* <Route path="/newspapers" element={<Newspapers />} /> */}
            <Route path='/save' element={<Save/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </>
  );
}
