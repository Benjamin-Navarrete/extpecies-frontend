const MapComponent = () => {
  return (
    <div>
      <div>
        <h4 className="text-gray-600 text-center ">
          Mapa en desarrollo (se requiere backend)
        </h4>
      </div>
      <div className="gmap_canvas m-4 mr-3">
        <iframe
          title="Mapa extpecies"
          width="100%"
          height="600px"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=pontificia%20universidad%20catolica%20de%20valparaiso%20inrofmatica&t=&z=15&ie=UTF8&iwloc=&output=embed"
        ></iframe>
        <br />
      </div>
    </div>
  );
};

export default MapComponent;
