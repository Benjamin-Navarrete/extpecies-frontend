// Archivo src\components\Profile\List.js
import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import Especie from './EspecieRow';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import EditListModal from './EditListModal';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { deleteList } from '@/api/listaApi';

// Componente para mostrar cada lista
const List = ({ nombre, especies, descripcion, id: listaId }) => {
  const queryClient = useQueryClient();
  // Creo una variable de estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado local para almacenar el número de especies que se muestran
  const [numEspecies, setNumEspecies] = useState(
    // Inicializo el estado con el valor 4 o el número de especies que tenga la lista, el menor de los dos
    Math.min(4, especies.length)
  );

  // Función que incremente el estado en 4 cada vez que se pulse el botón de cargar más
  const handleLoadMore = () => {
    setNumEspecies(numEspecies + 4);
  };

  // Creo una función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Creo la variable deleteListMutation que es el resultado de invocar el método useMutation con el método deleteList y un objeto de opciones
  const deleteListMutation = useMutation(deleteList, {
    // Dentro del objeto de opciones, defino las funciones onSuccess, onError y onSettled
    // Dentro de la función onSuccess, muestro un mensaje de éxito, cierro el modal e invalido las queries que dependen de la lista eliminada
    onSuccess: response => {
      toast.success(response.message);
      queryClient.invalidateQueries('listas');
    },
    // Dentro de la función onError, muestro un mensaje de error y manejo el error de alguna forma
    onError: error => {
      toast.error('Ha ocurrido un error al eliminar la lista');

      switch (error.response.status) {
        case 404:
          toast.error(
            'No se encontró la lista con el id ' + error.response.data.id
          );
          break;
        case 500:
          toast.error('Error interno del servidor');
          break;
        default:
          toast.error('Error desconocido');
      }
    },

    onSettled: () => {
      // toast.info('La mutación se ha completado');
    }
  });

  // Función para manejar el click en el botón de eliminar
  const handleDeleteClick = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta lista?"')) {
      deleteListMutation.mutate({ id: listaId });
    }
  };

  return (
    <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 md:flex-grow md:flex-shrink">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 ">
          {nombre}
        </h5>
        {/* Reemplazo el elemento a por el componente Menu */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="text-sm font-medium text-emerald-600 hover:underline flex items-center">
            {/* Añado el icono de tres puntos verticales al lado del texto */}
            Opciones
            <EllipsisVerticalIcon className="h-5 w-5 ml-1" />
          </Menu.Button>
          {/* Creo el elemento Menu.Items con el estilo de un menú desplegable */}
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* Creo los elementos Menu.Item con el texto de cada opción */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-emerald-600 text-white' : 'text-gray-900'
                  } group flex items-center px-4 py-2 text-sm w-full text-left`}
                  onClick={handleDeleteClick}
                >
                  Eliminar lista
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? 'bg-emerald-600 text-white' : 'text-gray-900'
                  } group flex items-center px-4 py-2 text-sm`}
                >
                  Compartir
                </a>
              )}
            </Menu.Item>
            {/* Creo el elemento Menu.Item con el componente EditListModal como hijo */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-emerald-600 text-white' : 'text-gray-900'
                  } group flex items-center px-4 py-2 text-sm w-full text-left`}
                  onClick={openModal}
                >
                  Editar o ver
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
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
      <EditListModal
        nombre={nombre}
        descripcion={descripcion}
        especies={especies}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        id={listaId}
      />
    </div>
  );
};

// Exporto el componente List
export default List;
