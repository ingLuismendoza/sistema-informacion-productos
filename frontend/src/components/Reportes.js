import React, { useState } from "react";
import axios from "axios";

const Reportes = () => {
  const [filtros, setFiltros] = useState({
    producto: "",
    documento: "",
    numeroUnico: "",
    condicionVictima: "",
  });

  const generarReporte = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/reportes/generar", {
      params: filtros,
      responseType: "blob",
      headers: { Authorization: `Bearer ${token}` },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reporte_poseedores.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reportes-container">
      <h2>Generar Reporte de Poseedores</h2>
      <div>
        <input
          type="text"
          placeholder="Producto"
          value={filtros.producto}
          onChange={(e) => setFiltros({ ...filtros, producto: e.target.value })}
        />
        <input
          type="text"
          placeholder="Documento"
          value={filtros.documento}
          onChange={(e) => setFiltros({ ...filtros, documento: e.target.value })}
        />
        <input
          type="text"
          placeholder="Número Único"
          value={filtros.numeroUnico}
          onChange={(e) => setFiltros({ ...filtros, numeroUnico: e.target.value })}
        />
        <select
          value={filtros.condicionVictima}
          onChange={(e) => setFiltros({ ...filtros, condicionVictima: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <button onClick={generarReporte}>Generar Reporte</button>
      </div>
    </div>
  );
};

export default Reportes;