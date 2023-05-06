// components/LeafletMap.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
        <Marker key={index} position={[especie.latitud, especie.longitud]}>
          <Popup>
            {especie.nombreComun} ({especie.nombreCientifico})
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
