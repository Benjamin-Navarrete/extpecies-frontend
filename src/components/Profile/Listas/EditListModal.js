// Archivo src\components\Profile\Listas\EditListModal.js
import { Dialog, Transition } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Fragment } from 'react';

// Importo el componente SearchBox que me permite buscar especies
// import SearchBox from './SearchBox';

// Importo el componente EspecieRow que me permite mostrar cada especie
import EspecieRow from './EspecieRow';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from 'react-query';
import { updateList } from '@/api/listaApi';
import { toast } from 'react-toastify';

// Creo el componente EditListModal
const EditListModal = ({
  id,
  nombre,
  descripcion,
  especies,
  isOpen,
  setIsOpen
}) => {
  // Creo un esquema de yup para validar los campos del formulario
  const validationSchema = yup.object().shape({
    nombre: yup
      .string()
      .required('El nombre es obligatorio')
      .max(50, 'El nombre no puede tener más de 50 caracteres'),
    descripcion: yup
      .string()
      .max(200, 'La descripción no puede tener más de 200 caracteres')
  });

  const queryClient = useQueryClient();

  // Creo una función para cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Creo una mutación con react query para actualizar la lista
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    data => updateList(id, data), // Paso el id de la lista y los datos al método updateList
    {
      onSuccess: data => {
        // Si la mutación tiene éxito, muestro un mensaje de éxito
        queryClient.invalidateQueries('listas');
        toast.success(data.message || 'Lista actualizada correctamente');
      },
      onError: error => {
        // Si la mutación tiene error, muestro un mensaje de error
        toast.error(error.message);
      }
    }
  );

  // Creo una función para enviar el formulario
  const handleSubmit = values => {
    mutate(values);
    closeModal();
  };

  return (
    <>
      {/* Creo el componente Transition para animar el modal */}
      <Transition appear show={isOpen} as={Fragment}>
        {/* Creo el componente Dialog para crear el modal */}
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          {/* Creo el componente Dialog.Overlay para crear el fondo oscuro */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          {/* Creo un div para contener el contenido del modal */}
          <div className="min-h-screen px-4 text-center">
            {/* Creo un span para centrar el modal verticalmente */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              ​
            </span>
            {/* Creo un div para crear el modal con un estilo de tailwind */}
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {/* Creo un botón para cerrar el modal con un icono de X */}
              <button
                type="button"
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={closeModal}
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
              {/* Creo el componente Dialog.Title para crear el título del modal */}
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Editar o ver lista
              </Dialog.Title>
              {/* Creo un hr para separar el título del contenido */}
              <hr className="my-4" />
              {/* Creo el componente Formik para crear el formulario */}
              <Formik
                initialValues={{ id, nombre, descripcion }} // Paso el id de la lista como valor inicial
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {/* Creo el componente Form para crear el contenedor del formulario */}
                <Form>
                  {/* Creo un div para crear el campo del nombre de la lista */}
                  <div className="mb-4">
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre de la lista
                    </label>
                    {/* Creo el componente Field para crear el input del nombre de la lista */}
                    <Field
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Escribe el nombre de la lista"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                    {/* Creo el componente ErrorMessage para mostrar el mensaje de error del nombre de la lista */}
                    <ErrorMessage
                      name="nombre"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  {/* Creo un div para crear el campo de la descripción de la lista */}
                  <div className="mb-4">
                    <label
                      htmlFor="descripcion"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descripción de la lista
                    </label>
                    {/* Creo el componente Field para crear el textarea de la descripción de la lista */}
                    <Field
                      id="descripcion"
                      name="descripcion"
                      type="textarea"
                      placeholder="Escribe la descripción de la lista"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      as="textarea"
                      rows="3"
                    />
                    {/* Creo el componente ErrorMessage para mostrar el mensaje de error de la descripción de la lista */}
                    <ErrorMessage
                      name="descripcion"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  {/* Creo un div para crear el botón de enviar el formulario */}
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </Form>
              </Formik>
              {/* Creo un hr para separar el formulario del cuadro de búsqueda */}
              <hr className="my-4" />
              {/* Creo el componente SearchBox para crear el cuadro de búsqueda */}
              {/* <SearchBox onSelect={especie => console.log(especie)} /> */}
              {/* Creo un div para crear la lista de especies con un estilo de tailwind */}
              <div className="overflow-y-auto max-h-64">
                <ul role="list" className="divide-y divide-gray-200 ">
                  {/* Si hay especies en la lista, las muestro */}
                  {especies.length > 0 ? (
                    // Mapeo el array de especies para mostrar cada una con el componente EspecieRow
                    especies.map(especie => (
                      <EspecieRow
                        key={especie.nombreComun}
                        listaId={id}
                        {...especie}
                      />
                    ))
                  ) : (
                    // Si no hay especies en la lista, muestro un mensaje
                    <li className="py-3 sm:py-4 text-center text-gray-500">
                      No hay especies en esta lista
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

// Exporto el componente EditListModal
export default EditListModal;
