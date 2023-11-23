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
  // Si el usuario es el dueño del perfil, mostrar el componente PrivateProfile
  if (isOwner) {
    return <PrivateProfile usuario={usuario} tab={tab} />;
  }
  // Si el usuario no es el dueño del perfil, mostrar el componente PublicProfile
  else {
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
  // Crear una variable props que almacene los props que se van a devolver
  let props = {};
  // Si hay token, verificar su validez y expiración con la función jwtVerify
  if (token) {
    const decodedToken = jwtDecode(token);
    const usuarioLogueado = decodedToken.usuario;
    // Obtener el usuario por id con la función obtenerUsuarioPorId
    const usuario = await obtenerUsuarioPorId(usuarioLogueado.id);
    // Comparar el username del usuario con el parámetro username de la url
    const isOwner = usuario.username === username;
    // Devolver los datos del usuario, el tab y el isOwner como props para la página
    return {
      props: {
        usuario,
        tab,
        isOwner
      }
    };
  }
  // Si no hay token, devolver solo el username y el tab como props para la página
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
