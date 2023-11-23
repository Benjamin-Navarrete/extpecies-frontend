// Archivo src\components\Profile\ProfileForm.js
import React from 'react';
import { Field, Form, ErrorMessage } from 'formik';
import { countries } from '@/utils/countries';

const ProfileForm = ({ formik }) => {
  // Este componente recibe el objeto formik como prop y muestra los campos del formulario y los botones de cancelar y guardar
  return (
    <Form className="flex-grow space-y-6">
      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700"
        >
          Sobre mí
        </label>
        <div className="mt-1">
          <Field
            as="textarea"
            id="about"
            name="about"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Una breve descripción de ti.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="nombres"
            className="block text-sm font-medium text-gray-700"
          >
            Nombres:
          </label>
          <Field
            type="text"
            name="nombres"
            id="nombres"
            autoComplete="nombres"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
          />
          <ErrorMessage
            name="nombres"
            component="div"
            className="text-red-500 text-sm mt-2"
          />
        </div>

        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="apellidos"
            className="block text-sm font-medium text-gray-700"
          >
            Apellidos
          </label>
          <Field
            type="text"
            name="apellidos"
            id="apellidos"
            autoComplete="apellidos"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-6">
          <label
            htmlFor="pais"
            className="block text-sm font-medium text-gray-700"
          >
            País
          </label>
          <Field
            as="select"
            name="pais"
            id="pais"
            autoComplete="pais"
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
    </Form>
  );
};

export default ProfileForm;
