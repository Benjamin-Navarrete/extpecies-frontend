// Archivo src\components\Profile\Lists.js
import React from 'react';
import AddListButton from './AddListButton';
import { useQuery } from 'react-query';
import { getAllLists } from '@/api/listaApi';
import List from './List';

// Defino el componente Lists
const Lists = () => {
  // Obtengo el id del usuario con el hook useQuery
  const { data: usuario } = useQuery('usuario');

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
    <div className="grid gap-3 mt-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {listas?.map(lista => (
        <List key={lista.id} {...lista} />
      ))}
      <AddListButton />
    </div>
  );
};

// Exporto el componente Lists como el principal
export default Lists;
