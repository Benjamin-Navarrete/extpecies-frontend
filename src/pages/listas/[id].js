// Archivo src\pages\listas\[id].js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getList } from '@/api/listaApi';
import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import { EyeIcon } from '@heroicons/react/24/outline';
import SpeciesModal from '@/components/Modals/SpeciesModal';

// Componente que muestra una lista con el enlace
const Lista = () => {
  // Obtengo el objeto router
  const router = useRouter();
  // Creo un estado para controlar si el modal está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  // Creo un estado para guardar la especie seleccionada
  const [selectedSpecie, setSelectedSpecie] = useState(null);

  // Obtengo el id de la lista desde el objeto params
  const { id } = router.query;

  // Creo una variable de estado para almacenar los datos de la lista
  const {
    data: lista,
    isLoading,
    isError,
    error
  } = useQuery(['lista', id], () => getList(id), { enabled: !!id });

  // Creo una función para abrir el modal y pasarle la especie
  const openModal = especie => {
    setSelectedSpecie(especie);
    setIsOpen(true);
  };

  // Creo una función para cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Si la lista no existe, muestro un mensaje
  if (!lista) {
    return <p>La lista no existe</p>;
  }

  // Si la petición falla, muestro un mensaje de error
  if (isError) {
    return <p>{error.message}</p>;
  }

  // Si la petición está cargando, muestro un mensaje
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  // Si la petición tiene éxito, muestro el nombre, la descripción y las especies de la lista
  return (
    <>
      {/* Uso el componente Head para añadir un título y una descripción a la página */}
      <Head>
        <title>{lista.nombre} - Listas de especies</title>
        <meta name="description" content={lista.descripcion} />
      </Head>
      <DefaultLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{lista.nombre}</h1>
          <p className="text-lg text-gray-700 mt-4">{lista.descripcion}</p>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Mapeo el array de especies para mostrar cada una */}
            {lista.especies.map(especie => (
              <li
                key={especie.nombreComun}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="flex-1 flex flex-col p-8">
                  <img
                    className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
                    src={especie.imagen}
                    alt={especie.nombreComun}
                  />
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">
                    {especie.nombreComun}
                  </h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Nombre científico</dt>
                    <dd className="text-gray-500 text-sm">
                      {especie.nombreCientifico}
                    </dd>
                    <dt className="sr-only">Familia</dt>
                    <dd className="text-gray-500 text-sm">{especie.familia}</dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <button
                        className="relative inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg rounded-br-lg border border-transparent py-4 px-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                        onClick={() => openModal(especie)}
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
        </div>
        {selectedSpecie && (
          <SpeciesModal
            isOpen={isOpen}
            closeModal={closeModal}
            especie={selectedSpecie}
          />
        )}
      </DefaultLayout>
    </>
  );
};

// Exporto el componente Lista
export default Lista;
