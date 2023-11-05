// Archivo src\components\Modals\AddSpecieModal.js
import { Dialog, Transition } from '@headlessui/react';
import React, { useState } from 'react';
import AddListModal from '../Profile/Listas/AddListModal';
import { addSpecieToList, getAllLists } from '@/api/listaApi';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

const AddSpecieModal = ({ isOpen, onClose, usuario, especie }) => {
  // Creo un estado local para el modal de crear lista
  const [createListModalOpen, setCreateListModalOpen] = useState(false);

  // Creo una mutación con el hook useMutation y le paso la función addSpecieToList y las opciones de la mutación
  const mutation = useMutation(
    listaId => addSpecieToList(listaId, especie.id), // Le paso el id de la lista y el id de la especie a la función
    {
      // Manejo el éxito de la mutación
      onSuccess: data => {
        // Cierro el modal
        onClose();
        toast.success(data.message);
      },
      // Manejo el error de la mutación
      onError: error => {
        // Muestro un mensaje de error
        toast.error(error.response.data.message);
      },
      // Manejo el resultado de la mutación
      onSettled: (data, error) => {
        // Aquí podría hacer algo más con el resultado, como invalidar alguna consulta o actualizar algún estado
      }
    }
  );

  // Creo una función para abrir el modal de crear lista
  const openCreateListModal = () => {
    setCreateListModalOpen(true);
  };

  // Creo una función para cerrar el modal de crear lista
  const closeCreateListModal = () => {
    setCreateListModalOpen(false);
  };

  // Uso el hook useQuery para obtener las listas existentes del usuario
  const {
    data: listas,
    isLoading,
    isError,
    error
  } = useQuery(['listas', usuario?.id], () => getAllLists(usuario?.id), {
    enabled: !!usuario?.id
  });

  return (
    <>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[9998] overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Añadir a lista
                </Dialog.Title>
                <div className="mt-2">
                  {isLoading ? ( // Muestro un mensaje de carga mientras se obtienen las listas
                    <p className="text-sm text-gray-500">Cargando listas...</p>
                  ) : isError ? ( // Muestro un mensaje de error si ocurre algún problema al obtener las listas
                    <p className="text-sm text-red-500">
                      Ocurrió un error al obtener las listas: {error.message}
                    </p>
                  ) : listas?.length > 0 ? ( // Muestro las listas obtenidas si hay alguna
                    <>
                      <p className="text-sm text-gray-500">
                        Aquí puedes elegir una lista para añadir la especie{' '}
                        {especie.nombre}.
                      </p>
                      <ul className="mt-4">
                        {' '}
                        {listas.map(
                          (
                            lista // Itero sobre las listas obtenidas y renderizo una opción por cada una
                          ) => (
                            <li
                              key={lista.id}
                              className="flex items-center justify-between py-2 border-b border-gray-200"
                            >
                              <span className="text-gray-900">
                                {lista.nombre}
                              </span>{' '}
                              <button // Creo un botón para añadir la especie a la lista
                                type="button"
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                                onClick={() => {
                                  mutation.mutate(lista.id);
                                }}
                              >
                                Añadir
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    // Muestro un mensaje si no hay listas
                    <p className="text-sm text-gray-500">
                      No tienes ninguna lista creada. Puedes crear una nueva
                      lista para añadir la especie {especie.nombre}.
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <button // Creo un botón para abrir el modal de crear lista
                    type="button"
                    className="inline-flex justify-center px-4 py-2 mr-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={openCreateListModal}
                  >
                    Crear lista
                  </button>
                  <button // Creo un botón para cerrar el modal
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <AddListModal
        showModal={createListModalOpen}
        closeModal={closeCreateListModal}
        usuario={usuario}
      />
    </>
  );
};

export default AddSpecieModal;
