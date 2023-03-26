import CheckboxField from '@/components/Inputs/CheckBoxField';
import InputField from '@/components/Inputs/InputField';
import SelectField from '@/components/Inputs/SelectField';
import SocialLoginButton from '@/components/SocialLoginButton';
import DefaultLayout from '@/layouts/DefaultLayout';
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

const countries = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CU', name: 'Cuba' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'MX', name: 'México' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
];

export default function Register() {
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
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Regístrate, cuidemos la biodiversidad juntos
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className=" " action="#" method="POST">
                <InputField
                  label="Nombre completo"
                  type="text"
                  name="name"
                  placeholder="Nombre y apellido"
                  autoComplete="name"
                />

                <InputField
                  label="Correo electrónico"
                  type="email"
                  name="email"
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
                  name="password_confirmation"
                  placeholder="Ingresa tu contraseña aquí"
                  autoComplete="current-password"
                />

                <SelectField
                  label="País"
                  name="country"
                  placeholder="Selecciona tu país"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </SelectField>

                <CheckboxField
                  label="Acepto los términos y condiciones"
                  name="terms"
                />

                <CheckboxField
                  label="Deseo recibir el boletín informativo"
                  name="newsletter"
                />

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Registrarse
                  </button>
                </div>
              </form>

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
