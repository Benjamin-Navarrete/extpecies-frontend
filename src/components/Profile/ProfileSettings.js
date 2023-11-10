// Archivo src\components\Profile\ProfileSettings.js
import React from 'react';
import { Formik } from 'formik';
import { initialValues } from './initialValues'; // Importo los valores iniciales desde otro archivo
import ProfilePhoto from './ProfilePhoto.js'; // Importo el componente ProfilePhoto
import CoverPhoto from './CoverPhoto'; // Importo el componente CoverPhoto
import ProfileForm from './ProfileForm'; // Importo el componente ProfileForm

const ProfileSettings = () => {
  const onSubmit = values => {
    // Aquí puedes manejar la lógica para enviar los datos del formulario.
    console.log('Valores del formulario:', values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {formik => (
        <div className="divide-y divide-gray-200">
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
            <div className="mt-6 flex flex-col 2xl:flex-row">
              {/* Uso el componente CoverPhoto y le paso el objeto formik como prop */}
              <CoverPhoto formik={formik} />
              {/* Uso el componente ProfilePhoto y le paso el objeto formik como prop */}
              <ProfilePhoto formik={formik} />
              {/* Uso el componente ProfileForm y le paso el objeto formik como prop */}
              <ProfileForm formik={formik} />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ProfileSettings;
