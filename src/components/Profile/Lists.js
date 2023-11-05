// Archivo src\components\Profile\Lists.js
import React, { useState } from 'react';
import AddListButton from './AddListButton';
import { useQuery } from 'react-query';
import { getAllLists } from '@/api/listaApi';
import { EyeIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';

// Creo un componente para mostrar cada cliente
const Especie = props => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={props.imagen}
            alt={props.nombreComun + ' image'}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate ">
            {props.nombreComun}
          </p>
          <p className="text-sm text-gray-500 truncate ">
            {props.estadoConservacion}
          </p>
        </div>

        <div className="inline-flex items-center text-base font-semibold text-gray-600">
          <EyeIcon
            className="h-5 w-5"
            data-tooltip-id="tooltip-ver"
            data-tooltip-content="Ver especie"
            data-tooltip-place="top"
          />
          <Tooltip id="tooltip-ver" />
        </div>
      </div>
    </li>
  );
};

// Defino el componente Grid
const Grid = () => {
  // Obtengo el id del usuario con el hook useQuery
  const { data: usuario } = useQuery('usuario');

  // Uso el hook useQuery para obtener las listas del usuario
  const {
    isLoading,
    error,
    data: listas
  } = useQuery('listas', () => getAllLists(usuario.id), {
    // Solo ejecuto la consulta si el usuario existe
    enabled: !!usuario
  });

  // Manejo el estado de carga
  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  // Manejo el estado de error
  if (error) {
    return (
      <div className="text-center">Ha ocurrido un error: {error.message}</div>
    );
  }

  // Renderizo los componentes List usando las listas obtenidas del api
  return (
    <div className="grid gap-3 mt-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {listas.map(lista => (
        <List key={lista.id} {...lista} />
      ))}
      <AddListButton />
    </div>
  );
};

// Creo un componente para mostrar cada lista
const List = ({ nombre, especies }) => {
  // Creo un estado local para almacenar el número de especies que se muestran
  const [numEspecies, setNumEspecies] = useState(
    // Inicializo el estado con el valor 4 o el número de especies que tenga la lista, el menor de los dos
    Math.min(4, especies.length)
  );

  // Creo una función que incremente el estado en 4 cada vez que se pulse el botón de cargar más
  const handleLoadMore = () => {
    setNumEspecies(numEspecies + 4);
  };

  return (
    <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 md:flex-grow md:flex-shrink">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 ">
          {nombre}
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-emerald-600 hover:underline "
        >
          Acciones
        </a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 ">
          {/* Si hay especies en la lista, las muestro */}
          {especies.length > 0 ? (
            // Filtro el array de especies para mostrar solo las que correspondan al estado actual
            especies
              .slice(0, numEspecies)
              .map(especie => (
                <Especie key={especie.nombreComun} {...especie} />
              ))
          ) : (
            // Si no hay especies en la lista, muestro un mensaje
            <li className="py-3 sm:py-4 text-center text-gray-500">
              No hay especies en esta lista
              <QuestionMarkCircleIcon
                className="h-5 w-5 inline-block ml-1 "
                data-tooltip-id="tooltip-id"
                data-tooltip-content={
                  'En una especie pulse el botón de "Añadir a lista" y seleccione la lista deseada'
                }
                data-tooltip-place="top"
                multiline={true}
              />
            </li>
          )}
        </ul>
        <Tooltip id="tooltip-id" />
        {/* Renderizo el botón de cargar más solo si el estado actual es menor que el número total de especies */}
        {numEspecies < especies.length && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              onClick={handleLoadMore}
            >
              Cargar más
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporto el componente Grid como el principal
export default Grid;
