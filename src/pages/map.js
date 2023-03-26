import MapComponent from '../components/MapComponent';
import Especies from '../assets/especies.json';

import DefaultLayout from '@/layouts/DefaultLayout';

const Mapa = () => {
  return (
    <DefaultLayout>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <MapComponent />
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
