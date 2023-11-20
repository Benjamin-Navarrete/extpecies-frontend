// Archivo src\api\achievementsApi.js
import axios from 'axios';

export const achievementsApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

// Funcion para obtener logros de un usuario por su id
export const getAchievementsByUserId = async id => {
  const response = await achievementsApi.get(`logros/usuario/${id}`);
  return response.data;
};
