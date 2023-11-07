// Archivo src\api\listaApi.js
import axios from 'axios';

// Instancia de axios con la base URL
export const listaApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

// Función para hacer el post de una nueva lista con axios
export const createList = async data => {
  const response = await listaApi.post('listas', data);
  return response.data;
};

// Función para hacer el post de todas las listas con axios
export const getAllLists = async userId => {
  // Paso el id del usuario al cuerpo de la petición
  const response = await listaApi.post('listas/getLists', {
    userId
  });
  return response.data;
};

// Función para hacer el put de una especie a una lista con axios
export const addSpecieToList = async (listaId, especie_id) => {
  // Paso los ids de la lista y de la especie como parámetros de la ruta
  const response = await listaApi.put(
    `listas/${listaId}/especies/${especie_id}`
  );
  return response.data;
};

// Método para eliminar una lista con axios
export const deleteList = async listaId => {
  // Hago una petición delete a la ruta listas/${listaId} con el id de la lista
  const response = await listaApi.delete(`listas/${listaId}`);
  // Devuelvo la respuesta del servidor
  return response.data;
};

export const updateList = async (id, data) => {
  const response = await listaApi.put(`listas/${id}`, data);
  return response.data;
};
