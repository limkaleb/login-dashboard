import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard'
import Landing from './landing'
import Profile from './profile'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;