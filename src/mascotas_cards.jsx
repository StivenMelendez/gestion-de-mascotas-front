import React from 'react';
import { Card, Row, Col, Badge, Button, Alert } from 'react-bootstrap';

const MascotasCards = ({ mascotas = [], onMostrarOpciones }) => {
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
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {mascotas.length > 0 ? (
          mascotas.map((mascota, index) => (
            <Col key={mascota._id || index}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">{mascota.nombre}</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <Badge bg="info" className="me-2">
                      {mascota.raza?.tipo?.nombre || 'Tipo no especificado'}
                    </Badge>
                    <Badge bg="secondary">
                      {mascota.raza?.nombre || 'Raza no especificada'}
                    </Badge>
                  </div>
                  <Card.Text>
                    <strong>Peso:</strong> {mascota.peso} kg
                  </Card.Text>
                  <Card.Text>
                    <strong>Fecha de nacimiento:</strong> {formatearFecha(mascota.fecha_de_nacimiento)}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button 
                    variant="success" 
                    size="sm" 
                    onClick={() => onMostrarOpciones(mascota)}
                  >
                    <i className="bi bi-gear-fill me-2"></i>
                    Opciones
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <i className="bi bi-inbox-fill mb-3" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
            <p className="text-muted">No hay mascotas para mostrar</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default MascotasCards;