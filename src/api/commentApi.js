// Archivo src\api\commentApi.js
import axios from 'axios';

export const commentApi = axios.create({
  baseURL: 'http://localhost:3500/api/comentarios'
});

export const createComment = async data => {
  const response = await commentApi.post('', {
    usuario_id: data.id_usuario,
    id_especie: data.id_especie,
    contenido: data.content
  });
  return response.data;
};

export const deleteComment = async data => {
  const response = await commentApi.delete(`/${data.id_comentario}`, {
    data: { usuario_id: data.id_usuario }
  });
  return response.data;
};

export const getCommentsByEspecie = async (id_especie, page, limit) => {
  const response = await commentApi.get('', {
    params: { especie_id: id_especie, page, limit }
  });
  return response.data;
};

export const updateComment = async data => {
  const response = await commentApi.put(`/${data.id}`, {
    contenido: data.contenido,
    usuario_id: data.id_usuario
  });
  return response.data;
};
