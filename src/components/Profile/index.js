// Archivo src\components\Profile\index.js
import Heading from '@/components/Profile/Heading';
import DefaultLayout from '@/layouts/DefaultLayout';
import Tabs from '@/components/Profile/Tabs';
import jwtDecode from 'jwt-decode';
import Cookies from 'cookies';

// Recibir el prop tab desde el archivo [tab].js
export default function Profile({ tab }) {
  return (
    <>
      <DefaultLayout>
        <Heading />
        {/* Pasar el prop tab al componente Tabs */}
        <Tabs tab={tab} />
      </DefaultLayout>
    </>
  );
}

// El método getServerSideProps se mantiene igual
export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get('token');
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  const decodedToken = jwtDecode(token);
  const usuario = decodedToken.usuario;
  return {
    props: {
      usuario
    }
  };
}
