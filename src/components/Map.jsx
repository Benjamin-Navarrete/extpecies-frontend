import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/especiesCoordenadas.json';


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
      {data.forEach((e) => {//no se marcan :C
        const coordenadas = e.sitio;
        console.log(coordenadas);
        
        <Marker position={coordenadas}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      })}
      <Marker position={data[8].sitio}>
        <Popup>
          {data[8].nombreComun} <br /> {data[8].nombreCientifico}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
