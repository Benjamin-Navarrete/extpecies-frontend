// Archivo src\api\userApi.js
import axios from 'axios';

export const userApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

// Crear una función para hacer el login con axios
export const login = async (correoElectronico, password) => {
  const response = await userApi.post('auth/signin', {
    correoElectronico,
    password
  });
  return response.data;
};

// Crear una función para obtener usuario por id con axios
export const obtenerUsuarioPorId = async id => {
  const response = await userApi.get(`usuarios/${id}`);
  return response.data;
};

export const actualizarUsuarioPorId = async ({ id, values }) => {
  // Crear un objeto FormData para enviar los datos del formulario
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }

  // Enviar el FormData con axios usando el método put y el id del usuario
  const response = await userApi.put(`usuarios/${id}`, formData, {
    // Especificar el Content-Type como multipart/form-data
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Crear una función para obtener usuario por nombre de usuario con axios
export const obtenerUsuarioPorNombreUsuario = async username => {
  const response = await userApi.get(`usuarios/username/${username}`);
  return response.data;
};
