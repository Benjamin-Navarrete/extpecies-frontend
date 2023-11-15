// Archivo src/components/Map.js
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useState } from 'react';
import SpeciesModal from './Modals/SpeciesModal';
import { useQuery } from 'react-query';
import { getEspecieById } from '@/api/specieApi';

// Importar useRouter desde next/router
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Logro from './Logro';

const Map = ({ especies, isLoading, isError }) => {
  // Usar useRouter para obtener el objeto router
  const router = useRouter();
  // Crear una variable de estado para el id de la especie inicial
  const [initialSpecieId, setInitialSpecieId] = useState(null);
  // Crear una variable de estado para el id de la especie seleccionada
  const [selectedSpecieId, setSelectedSpecieId] = useState(null);

  useEffect(() => {
    // Obtener el id de la especie inicial del parámetro de consulta de la URL
    const initialSpecie = router.query.especie_id;
    // Actualizar el estado con el id de la especie inicial
    setInitialSpecieId(initialSpecie);
    setSelectedSpecieId(initialSpecie);
  }, [router.query]);

  // Crear una consulta para obtener los detalles de la especie seleccionada por id
  // Usar el estado del id de la especie inicial en lugar del id de la especie seleccionada
  const {
    data: selectedSpecie,
    isLoading: isLoadingSpecie,
    isError: isErrorSpecie
  } = useQuery(
    ['especie', initialSpecieId],
    () => getEspecieById(initialSpecieId),
    {
      // Deshabilitar la consulta si el id es nulo
      enabled: !!initialSpecieId
    }
  );

  // Función para manejar el clic en un marcador
  const handleMarkerClick = especie => {
    // Actualizar el estado con el id de la especie seleccionada
    setSelectedSpecieId(especie.id);
    // Usar el método push del router para actualizar la URL con el id de la especie seleccionada
    router.push(`/map?especie_id=${especie.id}`, undefined, {
      shallow: true
    });
  };

  // Función para cerrar el modal
  const closeModal = () => {
    // Usar el método replace del router para eliminar el parámetro de consulta de la URL
    router.replace('/map', undefined, {
      shallow: true
    });
    // Actualizar el estado con el id de la especie seleccionada a null
    setSelectedSpecieId(null);
  };

  // Función para crear un icono personalizado con la imagen de la especie
  const createIcon = imagen => {
    return L.icon({
      iconUrl: imagen,
      iconSize: [40, 40],
      iconAnchor: [30, 30],
      popupAnchor: [0, -30],
      className: 'rounded-full shadow-lg bg-white' // Agregar una clase para el icono circular
    });
  };

  // Función para crear un marcador por cada especie
  const createMarkers = () => {
    // Iterar sobre el objeto de especies y crear un marcador por cada elemento
    return Object.entries(especies).map(([id, especie]) => {
      // Verificar si la especie tiene latitud y longitud definidas
      if (especie.latitud && especie.longitud) {
        // Crear un icono personalizado con la imagen de la especie
        const icon = createIcon(especie.imagen);
        // Crear un marcador con la posición, el icono y el popup de la especie
        // Agregar una prop key única al marcador
        return (
          <Marker
            position={[especie.latitud, especie.longitud]}
            icon={icon}
            key={id}
            eventHandlers={{
              click: () => handleMarkerClick(especie)
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold">{especie.nombreComun}</h3>

                <span className="text-red-500 font-semibold">
                  {especie.estadoConservacion}
                </span>
              </div>
            </Popup>
          </Marker>
        );
      }
    });
  };

  // Verificar si los datos están cargando o si hay un error
  if (isLoading) {
    // Mostrar un mensaje o un spinner de carga
    return <p>Cargando...</p>;
  }

  if (isError) {
    // Mostrar un mensaje de error
    return <p>Ha ocurrido un error al obtener las especies</p>;
  }

  return (
    <>
      <MapContainer
        center={[-22.304787, -61.391037]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {createMarkers()}
      </MapContainer>

      {/* Pasar el estado del id de la especie seleccionada al componente SpeciesModal */}
      {/* Usar el resultado de la consulta para mostrar los datos de la especie en el modal */}
      {selectedSpecie && !isLoadingSpecie && (
        <SpeciesModal
          isOpen={selectedSpecieId !== null}
          closeModal={closeModal}
          especie={selectedSpecie}
          isLoading={isLoadingSpecie}
          isError={isErrorSpecie}
        />
      )}
      {/* Agregar el componente Logro y pasarle el prop logro que obtienes de la consulta */}
      <Logro logro={selectedSpecie?.logro} />
    </>
  );
};
export default Map;
