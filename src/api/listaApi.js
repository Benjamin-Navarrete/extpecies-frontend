import axios from 'axios';

// Creo una instancia de axios con la base URL
export const listaApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

// Creo una función para hacer el post de una nueva lista con axios
export const createList = async data => {
  const response = await listaApi.post('listas', data);
  return response.data;
};
