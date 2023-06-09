// Archivo src\pages\map.js
import MapLayout from '@/layouts/MapLayout';
import dynamic from 'next/dynamic';
import DefaultLayout from '@/layouts/DefaultLayout';
import axios from 'axios';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

function MapPage({ especies }) {
  return (
    <DefaultLayout>
      <MapLayout>
        <div className="w-full h-full">
          <Map especies={especies} />
        </div>
      </MapLayout>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  let especies = [];
  try {
    const response = await axios.get('http://localhost:3500/api/especies');
    especies = response.data;
  } catch (error) {
    console.error('Error obteniendo las especies: ', error);
  }

  console.log('Especies: ', especies);
  return { props: { especies } };
}

export default MapPage;
