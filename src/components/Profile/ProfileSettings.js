// Archivo src\components\Profile\ProfileSettings.js
import { countries } from '@/utils/countries';
import React from 'react';
import { Formik, Field, Form } from 'formik';

const initialValues = {
  username: 'deblewis',
  about: '',
  firstName: 'Debbie',
  lastName: 'Lewis',
  email: 'debbielewis@example.com',
  country: 'Chile',
  imageUrl: 'https://placehold.co/150x150'
};

const ProfileSettings = () => {
  const onSubmit = values => {
    // Aquí puedes manejar la lógica para enviar los datos del formulario.
    console.log('Valores del formulario:', values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="divide-y divide-gray-200">
        {/* Profile section */}
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Perfil
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Aquí puedes configurar tu perfil.
            </p>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="mt-3 flex-grow lg:mt-0 lg:mr-6 lg:flex-shrink-0 lg:flex-grow-0">
              <p
                className="text-sm mb-3 font-medium text-gray-700"
                aria-hidden="true"
              >
                Foto de perfil
              </p>
              <div className="mt-1 lg:hidden">
                <div className="flex my-4 items-center">
                  <div
                    className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                    aria-hidden="true"
                  >
                    <img
                      className="h-full w-full rounded-full"
                      src={initialValues.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-5 rounded-md shadow-sm">
                    <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:bg-gray-50">
                      <label
                        htmlFor="mobile-user-photo"
                        className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                      >
                        <span>Cambiar</span>
                        <span className="sr-only"> user photo</span>
                      </label>
                      <input
                        id="mobile-user-photo"
                        name="user-photo"
                        type="file"
                        className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative hidden overflow-hidden rounded-full lg:block">
                <img
                  className="relative h-40 w-40 rounded-full"
                  src={initialValues.imageUrl}
                  alt=""
                />
                <label
                  htmlFor="desktop-user-photo"
                  className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                >
                  <span>Change</span>
                  <span className="sr-only"> user photo</span>
                  <input
                    type="file"
                    id="desktop-user-photo"
                    name="user-photo"
                    className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                  />
                </label>
              </div>
            </div>

            <div className="flex-grow space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de usuario
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    extpecies.com/
                  </span>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="flex-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sobre mí
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Una breve descripción de ti.
                </p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700"
            >
              Foto de portada
            </label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:text-emerald-500"
                  >
                    <span>Sube una imagen</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">o arrastra y suelta</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG hasta 3MB</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombres:
              </label>
              <Field
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <Field
                type="text"
                name="email"
                id="correo"
                autoComplete="email"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Apellidos
              </label>
              <Field
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              {/* // TODO: reemplazar select */}
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                País
              </label>
              <Field
                as="select"
                name="country"
                id="country"
                autoComplete="country"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              >
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </Field>
            </div>
          </div>

          <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-emerald-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Guardar
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ProfileSettings;
