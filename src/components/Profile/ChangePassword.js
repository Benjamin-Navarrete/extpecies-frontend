// Archivo src\components\Profile\ChangePassword.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePassword = ({ usuario }) => {
  // Esquema de validación usando Yup
  const validationSchema = Yup.object().shape({
    nuevaContraseña: Yup.string()
      .required('Este campo es obligatorio')
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmarContraseña: Yup.string()
      .required('Este campo es obligatorio')
      .oneOf([Yup.ref('nuevaContraseña')], 'Las contraseñas no coinciden')
  });

  // Función para enviar la solicitud al servidor
  const onSubmit = async (values, { resetForm }) => {
    try {
      // Obtener el id del usuario
      const { id } = usuario;

      // Enviar la solicitud al servidor con el id y la nueva contraseña
      const response = await axios.put(
        `http://localhost:3500/api/usuarios/cambiar-pass/${id}`,
        values
      );

      console.log(response);

      // Mostrar un mensaje de éxito
      toast.success(response.data.message);

      // Limpiar el formulario
      resetForm();
    } catch (error) {
      // Mostrar un mensaje de error
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Cambiar contraseña
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Ingresa tu nueva contraseña y confírmala.
        </p>
      </div>
      <Formik
        initialValues={{
          nuevaContraseña: '',
          confirmarContraseña: ''
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="nuevaContraseña"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nueva contraseña
                </label>
                <div className="mt-1">
                  <Field
                    type="password"
                    name="nuevaContraseña"
                    id="nuevaContraseña"
                    autoComplete="new-password"
                    className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <ErrorMessage
                  name="nuevaContraseña"
                  component="p"
                  className="mt-2 text-sm text-red-600"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="confirmarContraseña"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar contraseña
                </label>
                <div className="mt-1">
                  <Field
                    type="password"
                    name="confirmarContraseña"
                    id="confirmarContraseña"
                    autoComplete="new-password"
                    className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <ErrorMessage
                  name="confirmarContraseña"
                  component="p"
                  className="mt-2 text-sm text-red-600"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Guardar cambios
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
