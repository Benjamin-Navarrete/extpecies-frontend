// Archivo src\components\Profile\ProfilePhoto.js
import React from 'react';
import { Field } from 'formik';

const ProfilePhoto = ({ formik }) => {
  // Este componente recibe el objeto formik como prop y muestra y cambia la foto de perfil del usuario
  return (
    <div className="mt-3 flex-grow mb-4 lg:mt-0 lg:mr-6 lg:flex-shrink-0 lg:flex-grow-0">
      <p className="text-sm mb-3 font-medium text-gray-700" aria-hidden="true">
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
              src={formik.values.imageUrl}
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
              <Field
                id="mobile-user-photo"
                name="imageUrl"
                type="text"
                className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden rounded-full lg:block">
        <div className="relative h-40 w-40 rounded-full">
          <img
            className="relative h-40 w-40 rounded-full"
            src={formik.values.imageUrl}
            alt=""
          />
          <label
            htmlFor="desktop-user-photo"
            className="absolute inset-0 flex h-full w-full rounded-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
          >
            <span>Change</span>
            <span className="sr-only"> user photo</span>
            <Field
              type="text"
              id="desktop-user-photo"
              name="imageUrl"
              className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
