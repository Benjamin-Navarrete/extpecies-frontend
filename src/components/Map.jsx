import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/especiesCoordenadas.json';
import L from 'leaflet';

function Marcadores(e) {
  //esto si lo imprime, pero los marcadores no, por algun motivo
  const coord = e.sitio;
  const nomCom = e.nombreComun;
  const nomCie = e.nombreCientifico;
  console.log(coord, nomCom, nomCie);
  return (
    <Marker position={coord}>
      <Popup>
        {nomCom} <br /> {nomCie}
      </Popup>
    </Marker>
  );
}

function getIcons(img) {
  const myIcon = L.icon({
    iconUrl: img,
    iconSize: [50, 50],
  });
  return myIcon;
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
      {data.forEach((e) => {
        Marcadores(e);
      })}
      <Marker position={data[0].sitio} icon={getIcons(data[0].imagen)}>
        <Popup>
          {data[0].nombreComun} <br /> {data[0].nombreCientifico}
        </Popup>
      </Marker>
      {
        //se puede recorrer manualmente en el peor caso escenario, creo que tengo una idea de como hacerlo iterativo
      }
    </MapContainer>
  );
};

export default Map;
