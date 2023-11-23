// Archivo src/pages/profile/[username]/[tab].js
import PublicProfile from '@/components/Profile/PublicProfile';
import PrivateProfile from '@/components/Profile/PrivateProfile';
import jwtDecode from 'jwt-decode';
import Cookies from 'cookies';
import {
  obtenerUsuarioPorId,
  obtenerUsuarioPorNombreUsuario
} from '@/api/userApi';

// No envolver el componente Profile con el componente withAuth
export default function ProfilePage({ usuario, tab, isOwner }) {
  // Si el usuario es el dueño del perfil, mostrar el componente PrivateProfile
  if (isOwner) {
    console.log('isOwner', isOwner);
    console.log('usuario', usuario);
    return <PrivateProfile usuario={usuario} tab={tab} />;
  }
  // Si el usuario no es el dueño del perfil, mostrar el componente PublicProfile
  else {
    console.log('isNotOwner', isOwner);
    console.log('usuario', usuario);
    return <PublicProfile usuario={usuario} tab={tab} />;
  }
}

export async function getServerSideProps(context) {
  // Obtener el parámetro username y tab de la url
  const { username, tab } = context.query;
  // Crear una instancia de Cookies con el contexto de la petición y la respuesta
  const cookies = new Cookies(context.req, context.res);
  // Obtener el token desde las cookies
  const token = cookies.get('token');
  // Si hay token, decodificarlo y obtener los datos del usuario
  if (token) {
    const decodedToken = jwtDecode(token);
    const usuarioLogueado = decodedToken.usuario;
    // Comparar el username del usuario con el parámetro username de la url
    const isOwner = usuarioLogueado.username === username;
    // Si el username de la url coincide con el username del usuario logueado, obtener el usuario por id con la función obtenerUsuarioPorId
    if (isOwner) {
      const usuario = await obtenerUsuarioPorId(usuarioLogueado.id);
      // Devolver los datos del usuario, el tab y el isOwner como props para la página
      return {
        props: {
          usuario,
          tab,
          isOwner
        }
      };
    }
    // Si el username de la url no coincide con el username del usuario logueado, obtener el usuario por username con la función obtenerUsuarioPorNombreUsuario
    else {
      const usuario = await obtenerUsuarioPorNombreUsuario(username);
      // Devolver los datos del usuario, el tab y el isOwner como props para la página
      return {
        props: {
          usuario,
          tab,
          isOwner
        }
      };
    }
  }
  // Si no hay token, devolver solo el username y el tab como props para la página
  else {
    const usuario = await obtenerUsuarioPorNombreUsuario(username);
    const isOwner = false;
    return {
      props: {
        usuario,
        tab,
        isOwner
      }
    };
  }
}
