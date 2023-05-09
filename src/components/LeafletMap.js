// components/LeafletMap.js
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = iconUrl => {
  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const LeafletMap = ({ especies, defaultCenter, defaultZoom }) => {
  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {especies.map((especie, index) => (
        <Marker
          key={index}
          position={[especie.latitud, especie.longitud]}
          icon={customIcon(especie.img)}
        >
          <Popup>
            {especie.nombreComun} ({especie.nombreCientifico})
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
