// src/components/SpeciesModal.js
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const SpeciesModal = ({ isOpen, closeModal, especie }) => {
  console.log(especie);
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[500] overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {especie?.nombreComun} ({especie?.nombreCientifico})
            </Dialog.Title>

            <div className="flex items-center mt-4">
              <img
                className="h-24 w-24 mr-4"
                src={especie?.imagen}
                alt={especie?.nombreComun}
              />
              <p>
                Estado de conservación:{' '}
                <strong>{especie?.estadoConservacion}</strong>
                <br />
                Descripción geográfica: {especie?.descripcionGeografica}
                <br />
                Amenazas: {especie?.detallesAmenazas}
                <br />
                Bibliografía: {especie?.bibliografia}
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SpeciesModal;
