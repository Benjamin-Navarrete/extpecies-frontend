// Archivo src\components\Profile\AddListModal.js
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { createList } from '@/api/listaApi';

const AddListModal = ({ showModal, closeModal }) => {
  // Creo un esquema de validación con yup
  const validationSchema = yup.object().shape({
    nombre: yup.string().required('El nombre de la lista es obligatorio'),
    descripcion: yup.string().optional()
  });

  // Obtengo el id del usuario con el hook useQuery
  const { data: usuario } = useQuery('usuario');

  // Uso el hook useMutation para crear una mutación que llame a la función del api
  const mutation = useMutation(
    createList,
    {
      // Manejo el éxito de la mutación
      onSuccess: data => {
        // Cierro el modal
        closeModal();
        // Muestro un mensaje de éxito
        alert('Se ha creado la lista ' + data.nombre);
      },
      // Manejo el error de la mutación
      onError: error => {
        // Muestro un mensaje de error
        alert(error.response.data.message);
      }
    },
    {
      // Solo ejecuto la consulta si el usuario existe
      enabled: !!usuario
    }
  );

  return (
    // Uso el componente Dialog de headlessui para crear el modal
    <Transition show={showModal} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[9999] overflow-y-auto"
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
                className="absolute top-0 right-0 p-1 m-2 bg-white rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-emerald-600 focus:ring-offset-emerald-200 focus:ring-opacity-emerald "
                onClick={closeModal}
              >
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
              {/* Uso el componente Formik para crear el formulario */}
              <Formik
                // Le paso el esquema de validación y la función de mutación
                validationSchema={validationSchema}
                initialValues={{
                  nombre: '',
                  descripcion: '',
                  usuario_id: usuario?.id
                }}
                onSubmit={values => mutation.mutate(values)}
              >
                {() => (
                  // Uso el componente Form para crear los campos del formulario
                  <Form>
                    <div className="space-y-6">
                      {/* Creo un campo para el nombre de la lista */}
                      <div>
                        <label
                          htmlFor="nombre"
                          className="block text-sm font-medium text-gray-700 "
                        >
                          Nombre de la lista
                        </label>
                        <div className="mt-1">
                          {/* Uso el componente Field para crear el input */}
                          <Field
                            id="nombre"
                            name="nombre"
                            type="text"
                            autoComplete="off"
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm "
                          />
                        </div>
                        {/* Uso el componente ErrorMessage para mostrar el mensaje de error */}
                        <ErrorMessage
                          name="nombre"
                          component="p"
                          className="mt-2 text-sm text-red-600 "
                        />
                      </div>
                      {/* Creo un campo para la descripción de la lista */}
                      <div>
                        <label
                          htmlFor="descripcion"
                          className="block text-sm font-medium text-gray-700 "
                        >
                          Descripción de la lista (opcional)
                        </label>
                        <div className="mt-1">
                          {/* Uso el componente Field para crear el textarea */}
                          <Field
                            id="descripcion"
                            name="descripcion"
                            as="textarea"
                            rows={3}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm "
                          />
                        </div>
                      </div>
                      {/* Creo dos botones para guardar y cancelar */}
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                          onClick={closeModal}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddListModal;
