// Archivo src\api\cuestionarioApi.js
import axios from 'axios';

export const cuestionarioApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

// Crear una función para crear un nuevo registro de cuestionario que ha respondido el usuario con axios
export const crearCuestionario = async data => {
  const response = await cuestionarioApi.post('cuestionarios', data);
  return response.data;
};

// Crear una función para obtener todos los cuestionarios respondidos por el id de un usuario con axios
export const obtenerCuestionariosPorUsuarioId = async id => {
  const response = await cuestionarioApi.get(`cuestionarios/${id}`);
  return response.data;
};
