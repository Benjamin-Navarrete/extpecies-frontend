// Archivo src/pages/login.js
import InputField from '@/components/Inputs/InputField';
import DefaultLayout from '@/layouts/DefaultLayout';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import useAuth from '@/hooks/useAuth';

export default function Login() {
  // Usar el hook useAuth para acceder a la mutación del login
  const { loginMutation } = useAuth();

  // Crear la función para manejar el envío del formulario con la mutación de react query
  const handleSubmit = (values, actions) => {
    // Ejecutar la mutación con los valores del formulario
    loginMutation.mutate(values);

    // Resetear el formulario y el estado de envío
    actions.resetForm();
    actions.setSubmitting(false);
  };

  // Crear el esquema de validación con yup
  const validationSchema = Yup.object({
    correoElectronico: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es obligatoria')
  });

  return (
    <>
      <DefaultLayout>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Inicia sesión en tu cuenta
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <Formik
                initialValues={{
                  correoElectronico: '',
                  password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      label="Correo electrónico"
                      type="email"
                      name="correoElectronico"
                      placeholder="Ingresa tu correo electrónico aquí"
                      autoComplete="email"
                    />

                    <InputField
                      label="Contraseña"
                      type="password"
                      name="password"
                      placeholder="Ingresa tu contraseña aquí"
                      autoComplete="current-password"
                    />

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex w-full justify-center rounded-md border border-transparent bg-emerald-600 mt-6 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                          isSubmitting && 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
