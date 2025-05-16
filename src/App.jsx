import Cabecera from './cabecera';
import TablaMascotas from './tabla_mascotas';
import MascotasCards from './mascotas_cards';
import ModalOpcionesMascota from './modal_opciones_mascota';
import ModalEditarMascota from './modal_editar_mascota';
import ModalCrearMascota from './modal_crear_mascota';
import { useState, useEffect } from 'react';
import { Alert, Spinner, ButtonGroup, Button } from 'react-bootstrap';
import { getMascotas, eliminarMascota, getMascotasByDueno } from './services/api';

function App() {
  const [mascotas, setMascotas] = useState([]);
  const [showModalOpciones, setShowModalOpciones] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalCrear, setShowModalCrear] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vistaTabla, setVistaTabla] = useState(true); // Estado para controlar la vista

  // Cargar mascotas al iniciar
  useEffect(() => {
    cargarMascotas();
  }, []);

  const cargarMascotas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMascotasByDueno(1);//<-- para ejemplo, para produccion cambiar por variable que contenga el id del dueño
      setMascotas(data);
    } catch (err) {
      setError('Error al cargar las mascotas. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMostrarOpciones = (mascota) => {
    setMascotaSeleccionada(mascota);
    setShowModalOpciones(true);
  };

  const handleMostrarCrearMascota = () => {
    setShowModalCrear(true);
  };

  const handleEditar = (mascota) => {
    setMascotaSeleccionada(mascota);
    setShowModalOpciones(false);
    setShowModalEditar(true);
  };

  const handleEliminar = async (mascota) => {
    try {
      setLoading(true);
      await eliminarMascota(mascota, mascota._id);
      
      // Actualizar la lista de mascotas después de eliminar
      setMascotas(mascotas.filter(m => m._id !== mascota._id));
      
      setLoading(false);
    } catch (err) {
      setError('Error al eliminar la mascota. Por favor, intenta de nuevo.');
      console.error(err);
      setLoading(false);
    }
  };

  const handleMascotaCreada = (mascotaCreada) => {
    setMascotas([...mascotas, mascotaCreada]);
  };

  const handleMascotaActualizada = (mascotaActualizada) => {
    setMascotas(mascotas.map((m) => 
      m._id === mascotaActualizada._id ? mascotaActualizada : m
    ));
  };

  return (
    <div className="container">
      <Cabecera />
      
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {/* Barra de herramientas con botón de agregar y selector de vista */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button 
          variant="info" 
          onClick={handleMostrarCrearMascota}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Agregar Mascota
        </Button>
        
        <ButtonGroup>
          <Button 
            variant={vistaTabla ? "primary" : "outline-primary"}
            onClick={() => setVistaTabla(true)}
          >
            <i className="bi bi-table me-2"></i>
            Tabla
          </Button>
          <Button 
            variant={!vistaTabla ? "primary" : "outline-primary"}
            onClick={() => setVistaTabla(false)}
          >
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Tarjetas
          </Button>
        </ButtonGroup>
      </div>
      
      {loading && !mascotas.length ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-2">Cargando mascotas...</p>
        </div>
      ) : (
        vistaTabla ? (
          <TablaMascotas 
            mascotas={mascotas} 
            onMostrarOpciones={handleMostrarOpciones}
            onCrearMascota={handleMostrarCrearMascota}
          />
        ) : (
          <MascotasCards
            mascotas={mascotas}
            onMostrarOpciones={handleMostrarOpciones}
          />
        )
      )}
      
      {/* Modales */}
      <ModalOpcionesMascota
        show={showModalOpciones}
        handleClose={() => setShowModalOpciones(false)}
        mascota={mascotaSeleccionada}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
      
      <ModalEditarMascota
        show={showModalEditar}
        handleClose={() => setShowModalEditar(false)}
        mascota={mascotaSeleccionada}
        onMascotaActualizada={handleMascotaActualizada}
      />
      
      <ModalCrearMascota
        show={showModalCrear}
        handleClose={() => setShowModalCrear(false)}
        onMascotaCreada={handleMascotaCreada}
      />
    </div>
  );
}

export default App;