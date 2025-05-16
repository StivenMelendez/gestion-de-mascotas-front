import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const ModalOpcionesMascota = ({ show, handleClose, mascota, onEditar, onEliminar }) => {
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  const handleMostrarConfirmacion = () => {
    setShowConfirmacion(true);
  };

  const handleCerrarConfirmacion = () => {
    setShowConfirmacion(false);
  };

  const handleEditarMascota = () => {
    onEditar(mascota);
    handleClose();
  };

  const handleConfirmarEliminar = () => {
    onEliminar(mascota);
    setShowConfirmacion(false);
    handleClose();
  };

  return (
    <>
      {/* Modal principal de opciones */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Opciones para {mascota?.nombre || 'la mascota'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col className="d-grid">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleEditarMascota}
                className="py-3"
              >
                <i className="bi bi-pencil-square me-2"></i>
                Editar Mascota
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="d-grid">
              <Button 
                variant="danger" 
                size="lg" 
                onClick={handleMostrarConfirmacion}
                className="py-3"
              >
                <i className="bi bi-trash me-2"></i>
                Eliminar Mascota
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal show={showConfirmacion} onHide={handleCerrarConfirmacion} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            ¿Está seguro que desea eliminar a <strong>{mascota?.nombre}</strong> de la lista de mascotas?
          </p>
          <p className="text-danger mt-3 mb-0">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarConfirmacion}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmarEliminar}>
            Sí, Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalOpcionesMascota;