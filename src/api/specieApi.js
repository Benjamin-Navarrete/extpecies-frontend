// Archivo src\api\specieApi.js
import axios from 'axios';
import Cookies from 'js-cookie';

export const specieApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

// Funcion para obtener especies
export const getEspecies = async () => {
  const response = await specieApi.get('especies');
  return response.data;
};

// Funcion para obtener especie por id
export const getEspecieById = async id => {
  const token = Cookies.get('token');
  const response = await specieApi.get(`especies/${id}`, {
    headers: {
      Authorization: `${token}`
    }
  });
  return response.data;
};
