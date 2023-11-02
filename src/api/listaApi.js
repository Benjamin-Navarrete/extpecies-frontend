// Archivo src\api\listaApi.js
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

// Creo una función para hacer el post de todas las listas con axios
export const getAllLists = async userId => {
  // Paso el id del usuario al cuerpo de la petición
  const response = await listaApi.post('listas/getLists', {
    userId
  });
  return response.data;
};
