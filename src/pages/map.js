// Archivo src\pages\map.js
import DefaultLayout from '@/layouts/DefaultLayout';
import especies from '../assets/especies600.json';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

function MapPage() {
  return (
    <DefaultLayout>
      <div style={{ height: '500px', width: '800px' }}>
        <Map especies={especies} />
      </div>
    </DefaultLayout>
  );
}

export default MapPage;
