import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function getIcons(_iconsize) {
  return L.icon({
    iconUrl: require("public/logo.png"),
    iconSize: [_iconsize],
  });
}

const Map = () => {
  return (
    <MapContainer
      center={[-32.772308, -71.533302]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: 400, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-32.772308, -71.533302]} icon={getIcons(100)}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
