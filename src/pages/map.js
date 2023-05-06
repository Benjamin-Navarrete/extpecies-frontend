import Especies from '../assets/especies.json';
import DefaultLayout from '@/layouts/DefaultLayout';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importa el componente LeafletMap solo en el lado del cliente
const LeafletMap = dynamic(() => import('../components/LeafletMap'), {
  ssr: false
});

const Mapa = () => {
  const defaultCenter = [-33.045845, -71.619674]; // Coordenadas de Valparaíso, Chile
  const defaultZoom = 8;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DefaultLayout>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              {isMounted && (
                <LeafletMap
                  especies={Especies}
                  defaultCenter={defaultCenter}
                  defaultZoom={defaultZoom}
                />
              )}
            </div>
            <div className="mt-10">
              {Especies.map((dato, index) => {
                return (
                  <div key={index} className="grid grid-cols-2 gap-6">
                    <div className="col-span-1 mb-3">
                      <img
                        src={dato.img}
                        alt={dato.nombreComun}
                        width="200px"
                        className="object-cover w-full h-48"
                      />
                    </div>
                    <div className="col-span-1 mb-3">
                      <h3 className="text-xl font-semibold">
                        Nombre Especie: {dato.nombreComun}
                      </h3>
                      <h6 className="text-base italic">
                        Nombre Científico: "{dato.nombreCientifico}"
                      </h6>
                      <p className="mt-2">
                        Categoría de Conservación: {dato.categoriaConservacion}
                      </p>
                      <p className="mt-2">
                        Rango Geográfico: {dato.rangoGeografico}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Mapa;
