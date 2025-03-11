import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Usuarios from "./components/Usuarios";
import Productos from "./components/Productos";
import Poseedores from "./components/Poseedores";
import Reportes from "./components/Reportes";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/poseedores" element={<Poseedores />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;