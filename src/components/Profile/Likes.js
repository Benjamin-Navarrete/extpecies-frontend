// Archivo src\components\Profile\Likes.js
import { EyeIcon } from '@heroicons/react/20/solid';
import { useQuery } from 'react-query';
import { getLikesByUser } from '@/api/likeApi';
import { useState } from 'react';
import SpeciesModal from '../Modals/SpeciesModal';

export default function Likes({ usuario }) {
  // Creo un estado para controlar si el modal está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  // Creo un estado para guardar la especie seleccionada
  const [selectedSpecie, setSelectedSpecie] = useState(null);

  // Se extraen los likes del usuario con useQuery
  const { data: likes } = useQuery(
    ['likes', usuario?.id],
    () => getLikesByUser(usuario?.id),
    {
      enabled: !!usuario?.id
    }
  );

  // si el arreglo de likes esta vacio o es null o undefined se muestra un mensaje
  if (!likes || likes.length === 0) {
    return (
      <>
        <div className="col-span-1 flex flex-col p-12 divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
          <p className="text-gray-500 text-2xl font-medium">
            No existen me gusta.
          </p>
        </div>
      </>
    );
  }

  // Creo una función para abrir el modal y pasarle la especie
  const openModal = especie => {
    setSelectedSpecie(especie);
    setIsOpen(true);
  };

  // Creo una función para cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {likes.map(especie => (
          <li
            key={especie.especy.nombreComun}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={especie.especy.imagen}
                alt=""
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {especie.especy.nombreComun}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">
                  {especie.especy.nombreCientifico}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="mt-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {especie.especy.estadoConservacion}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg rounded-br-lg border border-transparent py-4 px-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    onClick={() => openModal(especie.especy)}
                  >
                    {/* Le paso la función openModal al icono de ojo y le agrego un evento onClick */}
                    <EyeIcon
                      className="h-5 w-5 text-gray-400 cursor-pointer"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Ver especie</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedSpecie && (
        <SpeciesModal
          isOpen={isOpen}
          closeModal={closeModal}
          especie={selectedSpecie}
        />
      )}
    </>
  );
}
