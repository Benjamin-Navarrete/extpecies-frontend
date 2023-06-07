// Archivo src\components\Map.js
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const Map = ({ especies }) => {
  // Función para crear un icono personalizado con la imagen de la especie
  const createIcon = imagen => {
    return L.icon({
      iconUrl: imagen,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50]
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
          >
            <Popup>
              <h3>{especie.nombreComun}</h3>
              <p>{especie.nombreCientifico}</p>
              <p>{especie.estadoConservacion}</p>
            </Popup>
          </Marker>
        );
      }
    });
  };

  return (
    <MapContainer
      center={[-41.573328, -70.921259]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {createMarkers()}
    </MapContainer>
  );
};

export default Map;
