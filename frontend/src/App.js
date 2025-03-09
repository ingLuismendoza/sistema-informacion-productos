import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Productos from './components/Productos';
import Poseedores from './components/Poseedores';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/poseedores" element={<Poseedores />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;