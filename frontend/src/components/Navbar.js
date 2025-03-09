import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/poseedores">Poseedores</Link>
        </li>
        <li>
          <Link to="/reportes">Reportes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;