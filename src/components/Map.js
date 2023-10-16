// Archivo src/components/Map.js
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useState } from 'react';
import SpeciesModal from './Modals/SpeciesModal';
import { useQuery } from 'react-query';
import { getEspecieById } from '@/api/specieApi';

import { toast } from 'react-toastify';

const Map = ({ especies, isLoading, isError }) => {
  // // Agregar estado para el modal y la especie seleccionada
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // Agregar estado para el id de la especie seleccionada
  const [selectedSpecieId, setSelectedSpecieId] = useState(null);

  // Crear una consulta para obtener los detalles de la especie seleccionada por id
  const {
    data: selectedSpecie,
    isLoading: isLoadingSpecie,
    isError: isErrorSpecie
  } = useQuery(
    ['especie', selectedSpecieId],
    () => getEspecieById(selectedSpecieId),
    {
      // Deshabilitar la consulta si el id es nulo
      enabled: selectedSpecieId !== null
    }
  );

  // Función para manejar el clic en un marcador
  const handleMarkerClick = async especie => {
    try {
      // Establecer el id de la especie seleccionada
      setSelectedSpecieId(especie.id);
    } catch (error) {
      // Mostrar un toast de error si algo falla
      toast.error('Ha ocurrido un error al obtener el historial: ', error);
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    // // Cerrar modal
    // setIsModalOpen(false);
    // Limpiar el id de la especie seleccionada
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

      {/* Pasar el prop selectedSpecie al componente SpeciesModal */}

      <SpeciesModal
        isOpen={selectedSpecieId !== null}
        closeModal={closeModal}
        especie={selectedSpecie}
        isLoading={isLoadingSpecie}
        isError={isErrorSpecie}
      />
    </>
  );
};
export default Map;
