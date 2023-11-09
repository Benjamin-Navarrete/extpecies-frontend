// Archivo src\pages\profile\[tab].js
import Profile from '@/components/Profile';
import withAuth from '@/hocs/withAuth';

// Envolver el componente Profile con el componente withAuth
export default withAuth(function ProfilePage({ tab }) {
  return <Profile tab={tab} />;
});

// Agregar el método getServerSideProps para obtener el parámetro tab de la url
export async function getServerSideProps(context) {
  // Obtener el parámetro tab de la url
  const { tab } = context.query;
  // Devolver el parámetro tab como prop para la página
  return {
    props: {
      tab
    }
  };
}
