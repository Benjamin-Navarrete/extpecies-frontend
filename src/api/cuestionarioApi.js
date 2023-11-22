// Archivo src\api\cuestionarioApi.js
import axios from 'axios';

export const cuestionarioApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

// Crear una función para crear un nuevo registro de cuestionario que ha respondido el usuario con axios
export const crearCuestionario = async data => {
  console.log('data');
  console.log(data);
  const response = await cuestionarioApi.post('cuestionarios', data);
  return response.data;
};
