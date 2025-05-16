import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

const TablaMascotas = ({ mascotas = [], onMostrarOpciones, onCrearMascota }) => {
  // Función para formatear la fecha
  const formatearFecha = (fechaString) => {
    if (!fechaString) return '';
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString();
  };

  return (
    <div>
      {mascotas.length === 0 && (
        <Alert variant="info" className="mb-3">
          <i className="bi bi-info-circle me-2"></i>
          No hay mascotas registradas. Por favor, agregue una mascota para comenzar.
        </Alert>
      )}


      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Raza</th>
              <th>Peso (kg)</th>
              <th>Fecha de Nacimiento</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.length > 0 ? (
              mascotas.map((mascota, index) => (
                <tr key={mascota._id || index}>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.raza?.tipo?.nombre || 'No especificado'}</td>
                  <td>{mascota.raza?.nombre || 'No especificado'}</td>
                  <td>{mascota.peso}</td>
                  <td>{formatearFecha(mascota.fecha_de_nacimiento)}</td>
                  <td className="text-center">
                    <Button 
                      variant="success" 
                      size="sm" 
                      onClick={() => onMostrarOpciones(mascota)}
                    >
                      <i className="bi bi-gear-fill"></i> Opciones
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  <i className="bi bi-inbox-fill me-2" style={{ fontSize: '1.5rem' }}></i>
                  <p className="mb-0">No hay mascotas registradas</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablaMascotas;