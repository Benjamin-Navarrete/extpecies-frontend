// Archivo src\api\likeApi.js
import axios from 'axios';

export const userApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

export const darLike = async (id_usuario, id_especie) => {
  const response = await userApi.post('likes', {
    id_usuario,
    id_especie
  });
  return response.data;
};

export const quitarLike = async (id_usuario, id_especie) => {
  const response = await userApi.delete('likes', {
    data: {
      id_usuario,
      id_especie
    }
  });
  return response.data;
};

export const getLikesCountByEspecie = async id_especie => {
  const response = await userApi.get(`likes/especies/${id_especie}/count`);
  return response.data;
};

export const getLikesByUser = async id_usuario => {
  const response = await userApi.get(`likes/users/${id_usuario}`);
  return response.data;
};

export const getLikeByUserAndEspecie = async (id_usuario, id_especie) => {
  const response = await userApi.get(
    `likes/users/${id_usuario}/especies/${id_especie}`
  );

  console.log('response', response.data);
  return response.data;
};
