// Archivo src\components\Profile\AddListButton.js
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import AddListModal from './AddListModal';

const AddListButton = () => {
  // Creo un estado para manejar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);

  // Creo una función para abrir el modal
  const openModal = () => {
    setShowModal(true);
  };

  // Creo una función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center mt-4">
      {/* Creo un botón con un icono de más y un texto */}
      <button
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        onClick={openModal}
      >
        <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
        Añadir una nueva lista
      </button>
      {/* Renderizo el modal y le paso el estado y la función para cerrarlo */}
      <AddListModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default AddListButton;
