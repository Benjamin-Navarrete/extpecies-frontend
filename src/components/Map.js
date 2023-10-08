// Archivo src/components/Map.js
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useState } from 'react';
import SpeciesModal from './Modals/SpeciesModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const Map = ({ especies }) => {
  // Agregar estado para el modal y la especie seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecie, setSelectedSpecie] = useState(null);

  // Función para manejar el clic en un marcador
  const handleMarkerClick = async especie => {
    try {
      // Obtener el token desde la cookie
      const token = Cookies.get('token');

      // Verificar si el token existe
      if (token) {
        // Decodificar el token y obtener el id del usuario
        const { id } = jwtDecode(token);

        // Crear un objeto con los datos del historial
        const historial = {
          usuarioId: id,
          fecha: new Date().toLocaleDateString(),
          hora: new Date().toLocaleTimeString(),
          especie: `${especie.nombreComun} (${especie.nombreCientifico})`,
          informacion: `${especie.reino}, ${especie.familia}, ${especie.estadoConservacion}, ${especie.descripcionGeografica}, ${especie.detallesAmenazas}`
        };

        // Enviar una petición al servidor para guardar el historial con el token en el header
        await axios.post('http://localhost:3500/api/historial', historial, {
          headers: { 'x-access-token': token }
        });
      }

      // Establecer la especie seleccionada y abrir el modal
      setSelectedSpecie(especie);
      setIsModalOpen(true);
    } catch (error) {
      // Mostrar un mensaje de error si algo falla
      console.error('Error al guardar el historial: ', error);
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
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
    // Convertir el objeto json en un array de valores
    const especiesArray = Object.values(especies);
    // Iterar sobre el array y crear un marcador por cada elemento
    return especiesArray.map((especie, index) => {
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
            key={index}
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

      <SpeciesModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        especie={selectedSpecie}
      />
    </>
  );
};
export default Map;
