// Archivo src\pages\map.js
import MapLayout from '@/layouts/MapLayout';
import especies from '../assets/especies600.json';
import dynamic from 'next/dynamic';
import DefaultLayout from '@/layouts/DefaultLayout';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

function MapPage() {
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

export default MapPage;
