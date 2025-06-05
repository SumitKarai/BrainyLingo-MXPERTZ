import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoriesPage from './components/StoriesPage';
import StoryDetails from './components/StoryDetails';
import Navbar from './components/Navbar';





const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<StoriesPage/>} />
        <Route path='/story/:id' element={<StoryDetails/>} />
    
      </Routes>
    </Router>
  );
};

export default App;
