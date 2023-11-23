// Archivo src\components\Profile\Lists.js
import React from 'react';
import AddListButton from './AddListButton';
import { useQuery } from 'react-query';
import { getAllLists } from '@/api/listaApi';
import List from './List';

// Defino el componente Lists
const Lists = ({ usuario, isOwner }) => {
  // Uso el hook useQuery para obtener las listas del usuario
  const {
    isLoading,
    error,
    data: listas
  } = useQuery('listas', () => getAllLists(usuario?.id), {
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
    <>
      <div className="grid gap-3 mt-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {listas?.map(lista => (
          <List key={lista.id} isOwner={isOwner} {...lista} />
        ))}
        {isOwner && <AddListButton />}
      </div>
      {!isOwner && listas.length === 0 && (
        <div className="col-span-1 flex flex-col p-12 divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
          <p className="text-gray-500 text-2xl font-medium">
            No existen listas
          </p>
        </div>
      )}
    </>
  );
};

// Exporto el componente Lists como el principal
export default Lists;
