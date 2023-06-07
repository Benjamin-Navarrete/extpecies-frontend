// src/components/SpeciesModal.js
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const SpeciesModal = ({ isOpen, closeModal, especie = {} }) => {
  if (!especie) {
    especie = {};
  }

  // Usar la desestructuración de objetos para acceder a las propiedades del json
  // y asignar valores por defecto en caso de que no existan
  const {
    nombreComun = '',
    nombreCientifico = '',
    imagen = '',
    estadoConservacion = '',
    descripcionGeografica = '',
    detallesAmenazas = ''
  } = especie;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[500] overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />

          {/* Eliminar el span vacío que no tiene ninguna función */}
          {/* Usar un div con flex y justify-center para centrar el contenido */}
          <div className="flex justify-center items-center h-screen">
            {/* Agregar un margen superior e inferior de 8 al modal para que no ocupe toda la pantalla */}
            <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {/* Mover el botón de cerrar al lado izquierdo y hacerlo más pequeño */}
              <div className="flex justify-between items-center">
                {/* Usar un encabezado más grande para el título y centrarlo */}
                <Dialog.Title
                  as="h1"
                  className="text-xl font-bold leading-6 text-gray-900 text-center"
                >
                  {nombreComun} ({nombreCientifico})
                </Dialog.Title>
                {/* Usar un botón con un icono de x para cerrar el modal */}
                <button
                  onClick={closeModal}
                  className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Usar una condición para renderizar el contenido solo si especie es verdadero */}
              {especie && (
                // Agregar un alto máximo de 80vh y un overflow-y auto al div que contiene el contenido del modal
                // Así se podrá hacer scroll dentro del modal si el contenido es muy largo
                <div className=" items-center mt-4 max-h-[80vh] overflow-y-auto">
                  <img
                    className="h-auto w-screen mb-4 rounded-lg"
                    src={imagen}
                    alt={nombreComun}
                  />
                  {/* Usar una lista para mostrar los datos relevantes y darles más espacio */}
                  {/* Usar secciones con título y una línea gris divisoria para cada dato */}
                  <ul className="list-none list-inside ml-4">
                    <li>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Estado de conservación
                      </h2>
                      <p className="text-gray-600">{estadoConservacion}</p>
                      <hr className="my-2 border-gray-300" />
                    </li>
                    <li>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Descripción geográfica
                      </h2>
                      <p className="text-gray-600">{descripcionGeografica}</p>
                      <hr className="my-2 border-gray-300" />
                    </li>
                    <li>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Amenazas
                      </h2>
                      <p className="text-gray-600">{detallesAmenazas}</p>
                    </li>
                  </ul>
                  {/* Agregar un botón para cerrar el modal en la parte de abajo a la derecha */}
                  {/* Usar un div con flex y justify-end para alinear el botón */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SpeciesModal;
