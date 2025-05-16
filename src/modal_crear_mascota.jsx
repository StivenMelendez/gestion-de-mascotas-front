import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { crearMascota, getTipos, getRazasByTipo } from './services/api';

const ModalCrearMascota = ({ show, handleClose, onMascotaCreada }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    raza: '',
    peso: '',
    fecha_de_nacimiento: ''
  });
  
  const [tipos, setTipos] = useState([]);
  const [razas, setRazas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  // Cargar tipos de mascota al abrir el modal
  useEffect(() => {
    if (show) {
      cargarTipos();
      // Resetear el formulario
      setFormData({
        nombre: '',
        tipo: '',
        raza: '',
        peso: '',
        fecha_de_nacimiento: ''
      });
      setValidated(false);
    }
  }, [show]);

  // Cargar razas cuando cambie el tipo seleccionado
  useEffect(() => {
    if (formData.tipo) {
      cargarRazasPorTipo(formData.tipo);
    } else {
      setRazas([]);
    }
  }, [formData.tipo]);

  // Cargar tipos de mascota
  const cargarTipos = async () => {
    try {
      const tiposData = await getTipos();
      setTipos(tiposData);
    } catch (err) {
      setError('Error al cargar los tipos de mascota');
      console.error(err);
    }
  };

  // Cargar razas por tipo
  const cargarRazasPorTipo = async (tipoId) => {
    try {
      const razasData = await getRazasByTipo(tipoId);
      setRazas(razasData);
    } catch (err) {
      setError('Error al cargar las razas');
      console.error(err);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Si el tipo cambia, resetear la raza
    if (name === 'tipo') {
      setFormData(prev => ({ ...prev, raza: '' }));
    }
  };

  // Manejar envío del formulario
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Obtener los objetos completos de tipo y raza del estado
      const tipoSeleccionado = tipos.find(t => t._id === formData.tipo);
      const razaSeleccionada = razas.find(r => r._id === formData.raza);
      
      // Crear el objeto mascota con la estructura correcta que espera el backend
      const nuevaMascota = {
        nombre: formData.nombre,
        peso: parseFloat(formData.peso),
        fecha_de_nacimiento: new Date(formData.fecha_de_nacimiento).toISOString(),
        raza: {
          _id: formData.raza,
          nombre: razaSeleccionada?.nombre || "",
          tipo: {
            _id: formData.tipo,
            nombre: tipoSeleccionado?.nombre || ""
          }
        },
        dueno_id: 1 // Usar el ID que corresponda para tu aplicación
      };
      
      console.log('Enviando mascota:', JSON.stringify(nuevaMascota, null, 2));
      const mascotaCreada = await crearMascota(nuevaMascota, "1");
      onMascotaCreada(mascotaCreada);
      
      handleClose();
    } catch (err) {
      setError('Error al crear la mascota: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={loading ? null : handleClose} backdrop="static" centered>
      <Modal.Header closeButton={!loading}>
        <Modal.Title>Crear Nueva Mascota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Nombre de la mascota"
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un nombre.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="tipo">
            <Form.Label>Tipo de Mascota</Form.Label>
            <Form.Select 
              name="tipo" 
              value={formData.tipo} 
              onChange={handleChange}
              required
              disabled={loading || tipos.length === 0}
            >
              <option value="">Seleccione un tipo</option>
              {tipos.map((tipo) => (
                <option key={tipo._id} value={tipo._id}>
                  {tipo.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Seleccione un tipo de mascota.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="raza">
            <Form.Label>Raza</Form.Label>
            <Form.Select 
              name="raza" 
              value={formData.raza} 
              onChange={handleChange}
              required
              disabled={loading || !formData.tipo || razas.length === 0}
            >
              <option value="">Seleccione una raza</option>
              {razas.map((raza) => (
                <option key={raza._id} value={raza._id}>
                  {raza.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Seleccione una raza.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="peso">
            <Form.Label>Peso (kg)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Peso en kg"
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un peso válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fecha_de_nacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fecha_de_nacimiento"
              value={formData.fecha_de_nacimiento}
              onChange={handleChange}
              required
              disabled={loading}
              max={new Date().toISOString().split('T')[0]}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese una fecha válida.
            </Form.Control.Feedback>
          </Form.Group>
          
          <div className="d-flex justify-content-end">
            <Button 
              variant="secondary" 
              className="me-2" 
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              variant="success" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Creando...
                </>
              ) : 'Crear Mascota'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCrearMascota;