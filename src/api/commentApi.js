// Archivo src\api\commentApi.js
import axios from 'axios';

export const commentApi = axios.create({
  baseURL: 'http://localhost:3500/api/comentarios'
});

export const createComment = async data => {
  const response = await commentApi.post('', {
    usuarioId: data.id_usuario,
    especieId: data.id_especie,
    contenido: data.content
  });
  return response.data;
};

export const deleteComment = async data => {
  const response = await commentApi.delete(`/${data.id_comentario}`, {
    data: { usuarioId: data.id_usuario }
  });
  return response.data;
};

export const getCommentsByEspecie = async (id_especie, page, limit) => {
  const response = await commentApi.get('', {
    params: { especieId: id_especie, page, limit }
  });
  return response.data;
};

export const updateComment = async data => {
  const response = await commentApi.put(`/${data.id}`, {
    contenido: data.contenido,
    usuarioId: data.id_usuario
  });
  return response.data;
};
