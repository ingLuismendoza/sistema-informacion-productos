import React, { useState } from "react";
import axios from "axios";

const Reportes = () => {
  const [filtros, setFiltros] = useState({
    producto: "",
    documento: "",
    numeroUnico: "",
    condicionVictima: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const generarReporte = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reportes/generar", {
        params: filtros,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_poseedores.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      alert("Error al generar el reporte. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="reportes-container">
      <h2>Generar Reporte de Poseedores</h2>
      <div className="filtros">
        <label>
          Producto:
          <input
            type="text"
            name="producto"
            value={filtros.producto}
            onChange={handleChange}
          />
        </label>
        <label>
          Documento:
          <input
            type="text"
            name="documento"
            value={filtros.documento}
            onChange={handleChange}
          />
        </label>
        <label>
          Número Único:
          <input
            type="text"
            name="numeroUnico"
            value={filtros.numeroUnico}
            onChange={handleChange}
          />
        </label>
        <label>
          Condición de Víctima:
          <select
            name="condicionVictima"
            value={filtros.condicionVictima}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
      </div>
      <button onClick={generarReporte}>Generar Reporte</button>
    </div>
  );
};

export default Reportes;