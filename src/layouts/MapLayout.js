// Archivo src\layouts\MapLayout.js
import React from 'react';

const MapLayout = ({ children }) => {
  return (
    <div className="h-screen w-full flex flex-col bg-white shadow overflow-hidden rounded-lg">
      {/* Header */}
      <header className="bg-blue-500 text-white p-2">
        <h1 className="text-2xl">Mapa Extpecies</h1>
      </header>

      {/* Contenido (Mapa) */}
      <div className="w-full h-full flex flex-1 ">{children}</div>
    </div>
  );
};

export default MapLayout;
