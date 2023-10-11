// Archivo src/pages/login.js
import InputField from '@/components/Inputs/InputField';
import SocialLoginButton from '@/components/SocialLoginButton';
import DefaultLayout from '@/layouts/DefaultLayout';
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  // Crear el esquema de validación con yup
  const validationSchema = Yup.object({
    correoElectronico: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es obligatoria')
  });

  // Crear la función para manejar el envío del formulario con axios y js-cookie
  const handleSubmit = async (values, actions) => {
    // Crear una instancia del enrutador

    try {
      const { correoElectronico, password } = values;

      const response = await axios.post(
        'http://localhost:3500/api/auth/signin',
        {
          correoElectronico,
          password
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set('token', token);
        toast.success('Usuario autenticado exitosamente');

        // Redirigir al usuario a la página principal
        router.push('/map');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      actions.resetForm();
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
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

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      O inicia sesión con
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <SocialLoginButton
                    platform="Facebook"
                    icon={<FaFacebook />}
                  />
                  <SocialLoginButton platform="Twitter" icon={<FaTwitter />} />
                  <SocialLoginButton platform="GitHub" icon={<FaGithub />} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
