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
