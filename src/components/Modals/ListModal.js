// src/components/ListModal.js
// Este es el nuevo archivo que he creado para el componente del modal de crear lista
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

const ListModal = ({ isOpen, closeModal, especie, onListSelected }) => {
  // Este estado guarda el nombre de la lista que se va a crear
  const [listName, setListName] = useState('');

  // Este estado guarda la lista seleccionada del listbox
  const [selectedList, setSelectedList] = useState(null);

  // Esta función se ejecuta cuando se hace clic en el botón de crear lista
  const handleCreateList = () => {
    // Aquí debes agregar la lógica para crear la lista en la base de datos usando la API
    // Por ahora solo voy a mostrar un mensaje de éxito y cerrar el modal
    toast.success(`Se creó la lista ${listName} correctamente`);
    closeModal();
  };

  // Esta función se ejecuta cuando se cambia el valor del listbox
  const handleChangeList = value => {
    // Actualizar el estado con la lista seleccionada
    setSelectedList(value);
    // Ejecutar el callback que se pasó como prop desde SpeciesModal.js
    // Este callback recibe el id de la lista seleccionada como argumento
    onListSelected(value.id);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[9999] overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />

          {/* Usar un div con flex y justify-center para centrar el contenido */}
          <div className="flex justify-center items-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Crear una lista nueva
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Ingresa el nombre de la lista que quieres crear y luego haz
                    clic en el botón de confirmar. También puedes seleccionar
                    una lista existente para agregar la especie.
                  </p>
                </div>

                <div className="mt-4">
                  {/* Este es el input para ingresar el nombre de la lista */}
                  <input
                    type="text"
                    value={listName}
                    onChange={e => setListName(e.target.value)}
                    placeholder="Nombre de la lista"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="mt-4">
                  {/* Este es el listbox para mostrar las listas existentes */}
                  {/* Estoy usando el mismo componente que en SpeciesModal.js, pero con diferentes opciones */}
                  {/* Las opciones son un array de objetos con id y name de las listas */}
                  {/* Por ahora solo voy a usar un array fijo, pero luego debes obtenerlo desde la API */}
                  <Listbox value={selectedList} onChange={handleChangeList}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="block text-sm font-medium text-gray-700">
                          Selecciona una lista
                        </Listbox.Label>
                        <div className="mt-1 relative">
                          <span className="inline-block w-full rounded-md shadow-sm">
                            <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:leading-5">
                              <span className="block truncate">
                                {selectedList ? selectedList.name : 'Ninguna'}
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg
                                  className="h-5 w-5 text-gray-400"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path
                                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </Listbox.Button>
                          </span>

                          <Transition
                            show={open}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-[9999]"
                          >
                            <Listbox.Options
                              static
                              className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                            >
                              {/* Aquí se mapean las opciones del listbox */}
                              {[
                                { id: 1, name: 'Favoritos' },
                                { id: 2, name: 'Pendientes' },
                                { id: 3, name: 'Vistos' }
                              ].map(list => (
                                <Listbox.Option key={list.id} value={list}>
                                  {({ selected, active }) => (
                                    <div
                                      className={`${
                                        active
                                          ? 'text-white bg-indigo-600'
                                          : 'text-gray-900'
                                      } cursor-default select-none relative py-2 pl-8 pr-4`}
                                    >
                                      <span
                                        className={`${
                                          selected
                                            ? 'font-semibold'
                                            : 'font-normal'
                                        } block truncate`}
                                      >
                                        {list.name}
                                      </span>
                                      {selected && (
                                        <span
                                          className={`${
                                            active
                                              ? 'text-white'
                                              : 'text-indigo-600'
                                          } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                        >
                                          <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>

                <div className="mt-4 flex justify-end">
                  {/* Este es el botón para confirmar la creación de la lista */}
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    onClick={handleCreateList}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ListModal;
