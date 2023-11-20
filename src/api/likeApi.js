// Archivo src\api\likeApi.js
import axios from 'axios';
import Cookies from 'js-cookie';

export const likeApi = axios.create({
  baseURL: 'http://localhost:3500/api/'
});

export const darLike = async (id_usuario, id_especie) => {
  const token = Cookies.get('token');
  const response = await likeApi.post(
    'likes',
    {
      id_usuario,
      id_especie
    },
    {
      headers: {
        Authorization: `${token}`
      }
    }
  );
  console.log('darLike', response.data);
  return response.data;
};

export const quitarLike = async (id_usuario, id_especie) => {
  const response = await likeApi.delete('likes', {
    data: {
      id_usuario,
      id_especie
    }
  });
  return response.data;
};

export const getLikesCountByEspecie = async id_especie => {
  const response = await likeApi.get(`likes/especies/${id_especie}/count`);
  return response.data;
};

export const getLikesByUser = async id_usuario => {
  const response = await likeApi.get(`likes/users/${id_usuario}`);
  return response.data;
};

export const getLikeByUserAndEspecie = async (id_usuario, id_especie) => {
  const response = await likeApi.get(
    `likes/users/${id_usuario}/especies/${id_especie}`
  );

  return response.data;
};
