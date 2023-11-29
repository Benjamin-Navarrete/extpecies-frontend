// Archivo src/pages/profile/[username]/[tab].js
import PublicProfile from '@/components/Profile/PublicProfile';
import PrivateProfile from '@/components/Profile/PrivateProfile';
import jwtDecode from 'jwt-decode';
import {
  obtenerUsuarioPorId,
  obtenerUsuarioPorNombreUsuario
} from '@/api/userApi';
import Cookies from 'cookies';
import Link from 'next/link';

export default function ProfilePage({ usuario, tab, isOwner }) {
  // Agregar una condición para verificar si el usuario existe y está activado
  if (usuario && usuario.estado) {
    // Usar el operador ternario para renderizar el componente adecuado según el isOwner
    return isOwner ? (
      <PrivateProfile usuario={usuario} tab={tab} />
    ) : (
      <PublicProfile usuario={usuario} tab={tab} />
    );
  } else {
    // Si el usuario no existe o está desactivado, mostrar un mensaje de error con un texto y un enlace
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="col-span-1 flex flex-col p-8 divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
          <p className="text-gray-500 text-2xl font-medium">
            El usuario no existe o está inactivo.
          </p>
          <Link href="/">
            <span className="text-emerald-500 hover:text-emerald-600">
              Ir al inicio
            </span>
          </Link>
        </div>
      </div>
    );
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
