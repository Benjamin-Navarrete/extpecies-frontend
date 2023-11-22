// Archivo src\components\Profile\Achievements.js
import React from 'react';
import { useQuery, QueryClient } from 'react-query';
// import { Spinner } from 'react-bootstrap';
import { getAchievementsByUserId } from '@/api/achievementsApi';

// Crear un cliente de react-query
const queryClient = new QueryClient();

// Componente para mostrar los logros obtenidos por el usuario
export default function Achievements() {
  // Obtener el id del usuario desde el contexto o las props
  const userId = 1; // Esto es solo un ejemplo, puedes cambiarlo según tu lógica

  // Hacer una petición GET a la API usando el hook useQuery
  const { data, status, error } = useQuery(
    ['achievements', userId], // Clave única para identificar la petición
    () => getAchievementsByUserId(userId), // Función que devuelve una promesa con los datos de la respuesta
    { staleTime: 60000 } // Opciones para configurar la petición, por ejemplo, el tiempo de refresco
  );

  // // Si la petición está en curso, mostrar un indicador de carga
  // if (status === 'loading') {
  //   return (
  //     <div className="flex justify-center items-center">
  //       <Spinner
  //         animation="border"
  //         variant="success"
  //         className="text-green-500"
  //       />
  //     </div>
  //   );
  // }

  // Si la petición falla, mostrar un mensaje de error
  if (status === 'error') {
    return (
      <div className="flex justify-center items-center">
        <div className="text-red-500">{error.message}</div>
      </div>
    );
  }

  // Si la petición tiene éxito, mostrar los datos de la respuesta
  if (status === 'success') {
    // Extraer los logros y los logrosUsuario de la respuesta
    const { logros, logrosUsuario } = data;

    // Calcular el porcentaje de logros desbloqueados por el usuario
    const percentage = Math.round((logrosUsuario.length / logros.length) * 100);

    // Mostrar el porcentaje de logros desbloqueados
    return (
      <>
        <div className="text-2xl text-center">
          Has desbloqueado el {percentage}% de los logros
        </div>
        <ul className="divide-y divide-gray-100 mt-4">
          {logros.map(logro => {
            // Verificar si el usuario ha obtenido el logro o no
            const isUnlocked = logrosUsuario.some(
              logroUsuario => logroUsuario.id_logro === logro.id
            );

            // Aplicar un estilo diferente dependiendo del estado del logro
            const textColor = isUnlocked ? 'text-green-500' : 'text-gray-400';

            // Usar un icono de un candado abierto o cerrado para indicar el estado del logro
            const lockIcon = isUnlocked ? 'unlock' : 'lock';

            // Usar una imagen diferente dependiendo del nombre del logro
            const imageSrc =
              logro.nombre === 'Explorador Novato' ? 'A explorer' : 'An eye';

            // Mostrar cada elemento de la lista
            return (
              <li
                key={logro.id}
                className="flex justify-between gap-x-6 py-5 my-2 bg-white rounded-lg shadow"
              >
                <div className="flex min-w-0 gap-x-4 pl-6">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={imageSrc}
                    alt={logro.nombre}
                  />
                  <div className="min-w-0 flex-auto">
                    <p
                      className={`text-sm font-semibold leading-6 ${textColor}`}
                    >
                      {logro.nombre}
                    </p>
                    <p className={`mt-1 pr-10 text-xs leading-5 ${textColor}`}>
                      {logro.descripcion}
                    </p>
                  </div>
                </div>
                <div className="flex items-center pr-6">
                  <i className={`fas fa-${lockIcon} ${textColor}`} />
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
