// Archivo src/components/Profile/PublicProfile.js
import Heading from '@/components/Profile/Heading';
import DefaultLayout from '@/layouts/DefaultLayout';
import Tabs from '@/components/Profile/Tabs';
import { obtenerUsuarioPorNombreUsuario } from '@/api/userApi';

// Recibir el prop usuario y el prop tab desde el archivo [tab].js
export default function PublicProfile({ usuario, tab }) {
  return (
    <>
      <DefaultLayout>
        <Heading usuario={usuario} />
        {/* Pasar el prop tab y el prop isOwner al componente Tabs */}
        <Tabs tab={tab} isOwner={false} usuario={usuario} />
      </DefaultLayout>
    </>
  );
}

// Agregar el método getServerSideProps para obtener el usuario por nombre de usuario
export async function getServerSideProps(context) {
  // Obtener el parámetro username de la url
  const { username } = context.query;
  // Obtener el usuario por nombre de usuario con la función obtenerUsuarioPorNombreUsuario
  const usuario = await obtenerUsuarioPorNombreUsuario(username);
  // Devolver el usuario como prop para la página
  return {
    props: {
      usuario
    }
  };
}
