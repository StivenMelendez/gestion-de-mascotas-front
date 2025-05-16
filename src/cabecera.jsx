import React from 'react';

const Cabecera = ({ titulo = "Gestión de Mascotas", subtitulo = "Sistema de administración de información de mascotas" }) => {
  return (
    <header className="bg-primary text-white p-4 mb-4 rounded shadow text-center">
      <div className="d-flex justify-content-center align-items-center">
        <i className="bi bi-clipboard2-pulse fs-1 me-3"></i>
        <div>
          <h1 className="mb-0">{titulo}</h1>
          <p className="mb-0">{subtitulo}</p>
        </div>
      </div>
    </header>
  );
};

export default Cabecera;