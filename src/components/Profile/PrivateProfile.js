// Archivo src/components/Profile/PrivateProfile.js
import Heading from '@/components/Profile/Heading';
import DefaultLayout from '@/layouts/DefaultLayout';
import Tabs from '@/components/Profile/Tabs';

// Recibir el prop usuario y el prop tab desde el archivo [tab].js
export default function PrivateProfile({ usuario, tab }) {
  return (
    <>
      <DefaultLayout>
        <Heading usuario={usuario} />
        {/* Pasar el prop tab y el prop isOwner al componente Tabs */}
        <Tabs tab={tab} usuario={usuario} isOwner={true} />
      </DefaultLayout>
    </>
  );
}
