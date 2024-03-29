// src/components/SpeciesModal.js
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { getLikeByUserAndEspecie } from '@/api/likeApi';
import SpeciesActions from '../SpeciesActions';
import CommentSection from '../CommentSection';
import { useQuery } from 'react-query';

const SpeciesModal = ({ isOpen, closeModal, especie = {} }) => {
  const {
    // nombreComun = '',
    // nombreCientifico = '',
    reino = '',
    familia = '',
    estadoConservacion = '',
    rangoGeografico = '',
    amenazas = ''
  } = especie;
  // eslint-disable-next-line no-unused-vars
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { data: usuario } = useQuery('usuario');
  const { data: userLikes } = useQuery(
    ['userLikes', usuario?.id, especie.id],
    () => getLikeByUserAndEspecie(usuario?.id, especie.id),
    {
      enabled: !!(isOpen && usuario && especie.id),
      // Esta opción configura cuántas veces se intentará reintentar una query si falla
      retry: 1,
      onError: error => {
        if (error.response.status === 404) {
          setLiked(false);
        }
      },
      // Esta opción proporciona un valor inicial para la query mientras se resuelve
      initialData: null
    }
  );

  // Hook para ejecutar una función cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      // Verificar si el usuario ya le ha dado like a la especie
      // La variable userLikes es un objeto con el like del usuario por el id de la especie
      // Si el objeto es null, significa que no hay ningún like
      // Si el objeto existe, significa que hay un like
      const hasLiked = !!userLikes;

      // Actualizar la variable de estado con el resultado de la verificación
      setLiked(hasLiked);
    }
  }, [isOpen, userLikes]); // El hook se ejecuta solo cuando cambia el valor de isOpen o de userLikes

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[9991] overflow-y-auto"
        onClose={() => {
          closeModal();
          setLiked(false);
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />

          {/* Usar un div con flex y justify-center para centrar el contenido */}
          <div className="flex justify-center items-center h-screen">
            {/* Agregar un margen superior e inferior de 8 al modal para que no ocupe toda la pantalla */}
            <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="min-h-full  mt-4 max-h-[80vh] overflow-y-auto">
                  <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="sr-only">Profile</h1>
                    {/* Main 3 column grid */}
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                      {/* Left column */}
                      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                        {/* Welcome panel */}
                        <div className="overflow-hidden mt-1 rounded-lg bg-white shadow">
                          <h2 className="sr-only" id="profile-overview-title">
                            Profile Overview
                          </h2>
                          <div className="bg-white p-6">
                            <div className="sm:flex sm:items-center sm:justify-between">
                              <div className="sm:flex sm:space-x-5">
                                <div className="flex-shrink-0">
                                  <img
                                    className="mx-auto h-20 w-20 rounded-full"
                                    src={especie.imagen}
                                    alt=""
                                  />
                                </div>
                                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                  <p className="text-sm font-medium text-gray-600">
                                    {especie.estadoConservacion}
                                  </p>
                                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {especie.nombreComun}
                                  </p>
                                  <p className="text-sm font-medium text-gray-600">
                                    {especie.nombreCientifico}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions panel */}
                        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0">
                          <h2 className="sr-only" id="quick-links-title">
                            Quick links
                          </h2>
                          {/* Usar una condición para renderizar el contenido solo si especie es verdadero */}
                          {especie && (
                            // Agregar un alto máximo de 80vh y un overflow-y auto al div que contiene el contenido del modal
                            // Así se podrá hacer scroll dentro del modal si el contenido es muy largo
                            <div>
                              <img
                                className="h-auto w-screen mb-4 rounded-lg"
                                src={especie.imagen}
                                alt={especie.nombreComun}
                              />
                              {/* Usar una lista para mostrar los datos relevantes y darles más espacio */}
                              {/* Usar secciones con título y una línea gris divisoria para cada dato */}
                              <ul className="list-none list-inside ml-4">
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Reino
                                  </h2>
                                  <p className="text-gray-600">{reino}</p>
                                  <hr className="my-2 border-gray-300" />
                                </li>
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Familia
                                  </h2>
                                  <p className="text-gray-600">{familia}</p>
                                  <hr className="my-2 border-gray-300" />
                                </li>
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Estado de conservación
                                  </h2>
                                  <p className="text-gray-600">
                                    {estadoConservacion}
                                  </p>
                                  <hr className="my-2 border-gray-300" />
                                </li>
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Rango geográfico
                                  </h2>
                                  <p className="text-gray-600">
                                    {rangoGeografico}
                                  </p>
                                  <hr className="my-2 border-gray-300" />
                                </li>
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Amenazas
                                  </h2>
                                  <p className="text-gray-600">{amenazas}</p>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right column */}
                      <div className="grid grid-cols-1 gap-4">
                        <SpeciesActions
                          especie={especie}
                          usuario={usuario}
                          added={added}
                          setAdded={setAdded}
                        />
                        {/* Comentarios */}
                        <CommentSection
                          especie={especie}
                          usuario={usuario}
                          isOpen={isOpen}
                        />
                      </div>
                    </div>
                    {/* Agregar un botón para cerrar el modal en la parte de abajo a la derecha */}
                    {/* Usar un div con flex y justify-end para alinear el botón */}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => {
                          closeModal();
                          setLiked(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SpeciesModal;
