// Archivo src/pages/profile/[username]/[tab].js
import PublicProfile from '@/components/Profile/PublicProfile';
import PrivateProfile from '@/components/Profile/PrivateProfile';
import jwtDecode from 'jwt-decode';
import {
  obtenerUsuarioPorId,
  obtenerUsuarioPorNombreUsuario
} from '@/api/userApi';
import Cookies from 'cookies';

export default function ProfilePage({ usuario, tab, isOwner }) {
  // Usar el operador ternario para renderizar el componente adecuado según el isOwner
  return isOwner ? (
    <PrivateProfile usuario={usuario} tab={tab} />
  ) : (
    <PublicProfile usuario={usuario} tab={tab} />
  );
}

export async function getServerSideProps(context) {
  // Obtener el parámetro username y tab de la url
  const { username, tab } = context.query;
  // Crear una instancia de Cookies con el contexto de la petición y la respuesta
  const cookies = new Cookies(context.req, context.res);
  // Obtener el token desde las cookies
  const token = cookies.get('token');
  // Crear una variable props que almacene los props que se van a devolver
  let props = {};
  // Si hay token, verificar su validez y expiración con la función jwtVerify
  if (token) {
    try {
      // Si el token es válido y no ha expirado, decodificarlo y obtener los datos del usuario
      const decodedToken = jwtDecode(token);
      const usuarioLogueado = decodedToken.usuario;
      // Comparar el username del usuario con el parámetro username de la url
      const isOwner = usuarioLogueado.username === username;
      // Crear una variable usuario que almacene el resultado de las funciones obtenerUsuarioPorId y obtenerUsuarioPorNombreUsuario
      let usuario;
      // Si el username de la url coincide con el username del usuario logueado, obtener el usuario por id con la función obtenerUsuarioPorId
      if (isOwner) {
        usuario = await obtenerUsuarioPorId(usuarioLogueado.id);
      }
      // Si el username de la url no coincide con el username del usuario logueado, obtener el usuario por username con la función obtenerUsuarioPorNombreUsuario
      else {
        usuario = await obtenerUsuarioPorNombreUsuario(username);
      }
      // Asignar los datos del usuario, el tab y el isOwner a la variable props
      props = {
        usuario,
        tab,
        isOwner
      };
    } catch (error) {
      props = {
        username,
        tab,
        isOwner: false
      };
    }
  }
  // Si no hay token, asignar solo el username y el tab a la variable props, y el isOwner como falso
  else {
    const usuario = await obtenerUsuarioPorNombreUsuario(username);
    props = {
      usuario,
      tab,
      isOwner: false
    };
  }
  // Devolver la variable props al final de la función
  return {
    props
  };
}
