const API_URL = 'http://localhost:7000';

// Servicio para obtener todas las mascotas
export const getMascotas = async () => {
  try {
    const response = await fetch(`${API_URL}/mascotas`);
    if (!response.ok) throw new Error('Error al obtener mascotas');
    return await response.json();
  } catch (error) {
    console.error('Error en getMascotas:', error);
    throw error;
  }
};

// Servicio para obtener mascotas de un dueño específico
export const getMascotasByDueno = async (duenoId) => {
  try {
    const response = await fetch(`${API_URL}/mascotas/dueno/${duenoId}`);
    if (!response.ok) throw new Error('Error al obtener mascotas por dueño');
    return await response.json();
  } catch (error) {
    console.error('Error en getMascotasByDueno:', error);
    throw error;
  }
};

// Servicio para obtener todos los tipos de mascotas
export const getTipos = async () => {
  try {
    const response = await fetch(`${API_URL}/mascotas/tipos`);
    if (!response.ok) throw new Error('Error al obtener tipos');
    return await response.json();
  } catch (error) {
    console.error('Error en getTipos:', error);
    throw error;
  }
};

// Servicio para obtener razas por tipo
export const getRazasByTipo = async (tipoId) => {
  try {
    const response = await fetch(`${API_URL}/mascotas/razas/${tipoId}`);
    if (!response.ok) throw new Error('Error al obtener razas por tipo');
    return await response.json();
  } catch (error) {
    console.error('Error en getRazasByTipo:', error);
    throw error;
  }
};

// En services/api.js
export const crearMascota = async (mascota, duenoId) => {
  try {
    const response = await fetch(`${API_URL}/mascotas/crear/${duenoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mascota),
    });
    
    // Captura la respuesta completa para depuración
    const resText = await response.text();
    console.log('Respuesta del servidor:', resText);
    
    if (!response.ok) throw new Error(`Error ${response.status}: ${resText}`);
    
    // Intentamos parsear la respuesta como JSON
    let mascotaCreada;
    try {
      mascotaCreada = JSON.parse(resText);
    } catch (e) {
      console.error('Error al parsear respuesta JSON:', e);
      throw new Error('La respuesta del servidor no es un JSON válido');
    }
    
    // Asegurarnos que el objeto tiene la estructura correcta
    return {
      ...mascota,  // Usamos los datos que enviamos como base
      _id: mascotaCreada._id || mascotaCreada.id || Date.now().toString(), // Aseguramos tener un ID
      ...mascotaCreada  // Sobrescribimos con los datos devueltos por el servidor
    };
  } catch (error) {
    console.error('Error en crearMascota:', error);
    throw error;
  }
};

// Servicio para actualizar una mascota
export const actualizarMascota = async (mascota, mascotaId) => {
  try {
    const response = await fetch(`${API_URL}/mascotas/update/${mascotaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mascota),
    });
    if (!response.ok) throw new Error('Error al actualizar mascota');
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarMascota:', error);
    throw error;
  }
};

// Servicio para eliminar una mascota
export const eliminarMascota = async (mascota, mascotaId) => {
  try {
    const response = await fetch(`${API_URL}/mascotas/delete/${mascotaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mascota),
    });
    if (!response.ok) throw new Error('Error al eliminar mascota');
    return await response.json();
  } catch (error) {
    console.error('Error en eliminarMascota:', error);
    throw error;
  }
};