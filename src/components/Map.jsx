import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/especiesCoordenadas.json';


function Marcadores(e){
   //esto si lo imprime, pero los marcadores no, por algun motivo
  const coord = e.sitio;
  const nomCom = e.nombreComun;
  const nomCie = e.nombreCientifico;
  console.log(coord,nomCom,nomCie)
  return(
    <Marker position={coord}>
      <Popup>
        {nomCom} <br /> {nomCie}
      </Popup>
    </Marker>
  )
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
      {data.forEach(e => {
        Marcadores(e);
      })}
    </MapContainer>
  );
};

export default Map;
