// Archivo src\pages\map.js

// Importar useQuery desde react-query y getEspecies desde specieApi

import { useQuery } from 'react-query';
import { getEspecies } from '@/api/specieApi';

import MapLayout from '@/layouts/MapLayout';
import dynamic from 'next/dynamic';
import DefaultLayout from '@/layouts/DefaultLayout';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

function MapPage() {
  // Crear una consulta para obtener las especies desde el servidor

  const {
    data: especies,
    isLoading,
    isError
  } = useQuery(
    'especies',
    () =>
      // Obtener las especies desde el servidor

      getEspecies(),

    // Usar el método select para transformar los datos antes de guardarlos en el caché

    {
      select: data => {
        // Crear un objeto vacío para guardar los datos transformados
        const transformedData = {};
        // Iterar sobre el array de especies y asignar cada elemento al objeto usando el id como clave
        data.forEach(especie => {
          transformedData[especie.id] = especie;
        });
        // Devolver el objeto transformado
        return transformedData;
      }
    }
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
