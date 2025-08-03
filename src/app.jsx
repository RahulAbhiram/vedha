import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Navbar from './components/navbar';

const App = () => (
  <>
    <HashRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
