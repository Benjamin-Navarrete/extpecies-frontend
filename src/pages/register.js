// Archivo src\pages\register.js
import CheckboxField from '@/components/Inputs/CheckBoxField';
import InputField from '@/components/Inputs/InputField';
import SelectField from '@/components/Inputs/SelectField';
import SocialLoginButton from '@/components/SocialLoginButton';
import DefaultLayout from '@/layouts/DefaultLayout';
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const countries = [
  { code: 'Argentina', name: 'Argentina' },
  { code: 'Bolivia', name: 'Bolivia' },
  { code: 'Brasil', name: 'Brasil' },
  { code: 'Chile', name: 'Chile' },
  { code: 'Colombia', name: 'Colombia' },
  { code: 'Costa Rica', name: 'Costa Rica' },
  { code: 'Cuba', name: 'Cuba' },
  { code: 'República Dominicana', name: 'República Dominicana' },
  { code: 'Ecuador', name: 'Ecuador' },
  { code: 'El Salvador', name: 'El Salvador' },
  { code: 'Guatemala', name: 'Guatemala' },
  { code: 'Honduras', name: 'Honduras' },
  { code: 'México', name: 'México' },
  { code: 'Nicaragua', name: 'Nicaragua' },
  { code: 'Panamá', name: 'Panamá' },
  { code: 'Paraguay', name: 'Paraguay' },
  { code: 'Perú', name: 'Perú' },
  { code: 'Puerto Rico', name: 'Puerto Rico' },
  { code: 'Uruguay', name: 'Uruguay' },
  { code: 'Venezuela', name: 'Venezuela' }
];

export default function Register() {
  const router = useRouter();

  const validationSchema = Yup.object({
    nombreCompleto: Yup.string().required('El nombre completo es obligatorio'),
    correoElectronico: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es obligatoria'),
    confirmarContrasena: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('La confirmación de la contraseña es obligatoria'),
    pais: Yup.string().required('El país es obligatorio'),
    terminosYCondiciones: Yup.boolean().oneOf(
      [true],
      'Debes aceptar los términos y condiciones'
    ),
    boletinInformativo: Yup.boolean()
  });

  const handleSubmit = async (values, actions) => {
    try {
      const {
        nombreCompleto,
        correoElectronico,
        password,
        pais,
        boletinInformativo
      } = values;

      const response = await axios.post(
        'http://localhost:3500/api/auth/signup',
        {
          nombreCompleto,
          correoElectronico,
          password,
          pais,
          boletinInformativo
        }
      );

      if (response.status === 201) {
        toast.success('Usuario creado exitosamente');

        router.push('/login');
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
            {/* LOGO
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
              alt="Your Company"
            />
            */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Regístrate, cuidemos la biodiversidad juntos
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <Formik
                initialValues={{
                  nombreCompleto: '',
                  correoElectronico: '',
                  password: '',
                  confirmarContrasena: '',
                  pais: '',
                  terminosYCondiciones: false,
                  boletinInformativo: false
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      label="Nombre completo"
                      type="text"
                      name="nombreCompleto"
                      placeholder="Nombre y apellido"
                      autoComplete="name"
                    />

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

                    <InputField
                      label="Confirmar contraseña"
                      type="password"
                      name="confirmarContrasena"
                      placeholder="Ingresa tu contraseña aquí"
                      autoComplete="current-password"
                    />

                    <SelectField
                      label="País"
                      name="pais"
                      placeholder="Selecciona tu país"
                    >
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </SelectField>

                    <CheckboxField
                      label="Acepto los términos y condiciones"
                      name="terminosYCondiciones"
                    />

                    <CheckboxField
                      label="Deseo recibir el boletín informativo"
                      name="boletinInformativo"
                    />

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                          isSubmitting && 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Registrarse
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
                      O registrate con
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
