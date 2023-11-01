// Archivo src\components\Profile\AddListModal.js
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AddListModal = ({ showModal, closeModal }) => {
  return (
    // Uso el componente Dialog de headlessui para crear el modal
    <Transition show={showModal} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        {/* Creo un fondo oscuro semi-transparente */}
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

          {/* Creo un contenedor blanco centrado con un margen y un padding */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            ​
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
              {/* Creo un botón con un icono de cruz para cerrar el modal */}
              <button
                type="button"
                className="absolute top-0 right-0 p-1 m-2 bg-white rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-emerald-600 focus:ring-offset-emerald-200 focus:ring-opacity-50 focus:ring-opacity-emerald "
                onClick={closeModal}
              >
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
              {/* Aquí iría el formulario para añadir una nueva lista */}
              {/* ... */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddListModal;
