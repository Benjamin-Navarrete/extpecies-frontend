// Archivo src\components\Profile\Achievements.js
import React from 'react';
import { useQuery, QueryClient } from 'react-query';
import { getAchievementsByUserId } from '@/api/achievementsApi';
import Image from 'next/image'; // Importar el componente Image de Next.js
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';

// Componente para mostrar un logro con su imagen, nombre, descripción y estado
function AchievementCard({ nombre, nombreImagen, descripcion, desbloqueado }) {
  return (
    <div
      className={`flex flex-col items-center border-2 rounded-lg shadow-lg p-4 gap-2 ${
        desbloqueado ? 'bg-white' : 'bg-gray-200'
      }`}
    >
      <Image
        src={`/img/logros/${nombreImagen}`} // Usar el nombre del logro para obtener la imagen correspondiente
        alt={nombreImagen}
        width={100}
        height={100}
      />
      <h3 className="text-lg font-bold">{nombre}</h3>
      <p className="text-sm text-center text-gray-600">{descripcion}</p>
      {/* ubicar icono al final inferior (centrado al medio): */}
      <div className="flex flex-grow items-end justify-center w-full">
        {desbloqueado ? ( // Mostrar un ícono de check o de lock según el estado del logro
          <LockOpenIcon className="h-6 w-6 text-green-500" />
        ) : (
          <LockClosedIcon className="h-6 w-6 text-red-500" />
        )}
      </div>
    </div>
  );
}

// Componente para mostrar los logros obtenidos por el usuario
export default function Achievements({ usuario }) {
  // Hacer una petición GET a la API usando el hook useQuery
  const {
    data: rawData,
    status,
    error
  } = useQuery(
    ['achievements', usuario?.id], // Clave única para identificar la petición
    () => getAchievementsByUserId(usuario?.id), // Función que devuelve una promesa con los datos de la respuesta
    { staleTime: 60000, enabled: !!usuario?.id } // Opciones para configurar la petición, por ejemplo, el tiempo de refresco
  );

  // Ordenar los datos por nombre y por el atributo "desbloqueado"
  const data = rawData?.sort((a, b) => {
    // Primero ordenar por el atributo "desbloqueado"
    if (a.desbloqueado && !b.desbloqueado) return -1;
    if (!a.desbloqueado && b.desbloqueado) return 1;

    // Si ambos tienen el mismo estado de "desbloqueado", ordenar por nombre
    return a.nombre.localeCompare(b.nombre);
  });

  // Calcular el porcentaje de logros desbloqueados usando la función reduce sobre el arreglo data
  const porcentaje = data
    ? Math.round(
        (data.reduce(
          (acum, logro) => (logro.desbloqueado ? acum + 1 : acum),
          0
        ) /
          data.length) *
          100
      )
    : 0;

  // Mostrar el porcentaje de logros desbloqueados en un elemento h2 con clases de Tailwind
  return (
    <div className="p-4">
      <h2 className="text-lg bg-white font-bold text-center border rounded-lg shadow p-4">
        Has desbloqueado el {porcentaje}% de los logros
      </h2>
      <div className="w-full bg-gray-200 rounded-lg h-1">
        <div
          className={`bg-blue-500 h-1 rounded-lg transition-all duration-500 ease-in-out`}
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {status === 'loading' && <p>Cargando...</p>}
        {status === 'error' && (
          // Mostrar un mensaje de error si la petición falla
          <p className="text-red-500 text-center">{error.message}</p>
        )}
        {status === 'success' &&
          // Usar la función map sobre el arreglo data para renderizar un componente AchievementCard por cada logro
          data.map(logro => (
            <AchievementCard
              key={logro.nombre}
              nombre={logro.nombre}
              nombreImagen={logro.nombre_imagen}
              descripcion={logro.descripcion}
              desbloqueado={logro.desbloqueado}
            />
          ))}
      </div>
    </div>
  );
}
