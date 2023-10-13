// Archivo src\pages\map.js
import MapLayout from '@/layouts/MapLayout';
import dynamic from 'next/dynamic';
import DefaultLayout from '@/layouts/DefaultLayout';
import { getEspecies } from '@/api/specieApi';

// Importar useQuery desde react-query
import { useQuery } from 'react-query';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

function MapPage() {
  // Crear una consulta para obtener las especies desde el servidor
  const {
    data: especies,
    isLoading,
    isError
  } = useQuery('especies', () =>
    // Obtener las especies desde el servidor
    getEspecies()
  );

  return (
    <DefaultLayout>
      <MapLayout>
        <div className="w-full h-full">
          {/* Pasar el prop especies al componente Map */}
          <Map especies={especies} isLoading={isLoading} isError={isError} />
        </div>
      </MapLayout>
    </DefaultLayout>
  );
}

export default MapPage;
