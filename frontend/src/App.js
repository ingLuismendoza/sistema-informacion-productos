import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio"; // Asegúrate de que esta ruta sea correcta
import Usuarios from "./components/Usuarios";
import Productos from "./components/Productos";
import Poseedores from "./components/Poseedores";
import Reportes from "./components/Reportes";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Menú de navegación */}
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} /> {/* Página de inicio */}
            <Route path="/usuarios" element={<Usuarios />} /> {/* Gestión de usuarios */}
            <Route path="/productos" element={<Productos />} /> {/* Gestión de productos */}
            <Route path="/poseedores" element={<Poseedores />} /> {/* Gestión de poseedores */}
            <Route path="/reportes" element={<Reportes />} /> {/* Generación de reportes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;