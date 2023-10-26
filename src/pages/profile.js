// Archivo src/pages/profile.js
import Heading from '@/components/Profile/Heading';
import DefaultLayout from '@/layouts/DefaultLayout';
import Tabs from '@/components/Profile/Tabs';
import withAuth from '@/hocs/withAuth';
import jwtDecode from 'jwt-decode';
// Cambiar el import de js-cookie por cookies
import Cookies from 'cookies';

// Envolver el componente Profile con el componente withAuth
export default withAuth(function Profile() {
  return (
    <>
      <DefaultLayout>
        <Heading />
        <Tabs />
      </DefaultLayout>
    </>
  );
});

// Agregar el método getServerSideProps para hacer la validación del lado del servidor
export async function getServerSideProps(context) {
  // Crear una instancia de Cookies con el contexto de la petición y la respuesta
  const cookies = new Cookies(context.req, context.res);
  // Obtener el token desde las cookies
  const token = cookies.get('token');
  // Si no hay token
  if (!token) {
    // Redirigir al usuario al login desde el servidor
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  // Si hay token, decodificarlo y obtener los datos del usuario
  const decodedToken = jwtDecode(token);
  const usuario = decodedToken.usuario;
  // Devolver los datos del usuario como props para la página
  return {
    props: {
      usuario
    }
  };
}
