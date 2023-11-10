// Archivo src\components\Profile\CoverPhoto.js
import React from 'react';
import { Field } from 'formik';

const CoverPhoto = ({ formik }) => {
  // Este componente recibe el objeto formik como prop y muestra y cambia la foto de portada del usuario
  return (
    <div className="sm:col-span-6 mb-4">
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
              <Field
                id="file-upload"
                name="coverPhoto"
                type="text"
                className="sr-only"
              />
            </label>
            <p className="pl-1">o arrastra y suelta</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG hasta 3MB</p>
        </div>
      </div>
    </div>
  );
};

export default CoverPhoto;
