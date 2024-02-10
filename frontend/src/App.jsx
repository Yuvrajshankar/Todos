import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Error from './components/404/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes >
    </Router >
  );
}

export default App;