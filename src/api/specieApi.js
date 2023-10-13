// Archivo src\api\userApi.js
import axios from 'axios';

export const userApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

// Funcion para obtener especies
export const getEspecies = async () => {
  const response = await userApi.get('especies');
  return response.data;
};
