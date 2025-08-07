import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Interview from './pages/interview';
import Tasks from './pages/tasks';
import Navbar from './components/navbar';

const App = () => (
  <>
    <HashRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/interview" element={<Interview/>} />
        <Route path="/tasks" element={<Tasks/>} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
