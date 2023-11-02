// Archivo src\components\Profile\Lists.js
import React from 'react';
import AddListButton from './AddListButton';
import { useQuery } from 'react-query';
import { getAllLists } from '@/api/listaApi';

// Creo un componente para mostrar cada cliente
const Customer = ({ name, email, image }) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={image}
            alt={name + ' image'}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate ">{name}</p>
          <p className="text-sm text-gray-500 truncate ">{email}</p>
        </div>
        {/* <div className="inline-flex items-center text-base font-semibold text-gray-900">
          ${amount}
        </div> */}
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
          Ver completa
        </a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 ">
          {/* Si hay especies en la lista, las muestro */}
          {especies.length > 0 ? (
            especies.map(especie => (
              <Customer key={especies.nombre} {...especie} />
            ))
          ) : (
            // Si no hay especies en la lista, muestro un mensaje
            <li className="py-3 sm:py-4 text-center text-gray-500">
              No hay especies en esta lista
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

// Exporto el componente Grid como el principal
export default Grid;
