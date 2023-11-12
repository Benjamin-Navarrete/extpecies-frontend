// Archivo src\components\Profile\ProfileSettings.js
import React from 'react';
import { Formik } from 'formik';
// Importar useQuery de react-query
import { useQuery } from 'react-query';
// Importar userApi y la función para obtener usuario por id
import { obtenerUsuarioPorId } from '@/api/userApi';
import ProfilePhoto from './ProfilePhoto.js';
import CoverPhoto from './CoverPhoto';
import ProfileForm from './ProfileForm';

const ProfileSettings = () => {
  // Obtener el id del usuario logeado
  const { data: usuario } = useQuery('usuario');
  const id = usuario.id;

  // Crear el useQuery para consultar los datos del usuario por id
  const {
    data: usuarioPorId,
    isLoading,
    error
  } = useQuery('usuarioPorId', () => obtenerUsuarioPorId(id), {
    enabled: !!id
  });

  const onSubmit = values => {
    // Aquí puedes manejar la lógica para enviar los datos del formulario.
    console.log('Valores del formulario:', values);
  };

  return (
    // Manejar el caso en que la data del usuario no esté disponible
    // Puedes mostrar un mensaje de carga, un valor por defecto o lo que prefieras
    isLoading ? (
      <div className="text-center">Cargando...</div>
    ) : error ? (
      <div className="text-center">Ha ocurrido un error</div>
    ) : (
      <Formik
        // Pasar la data del usuario como el valor inicial del formulario
        initialValues={usuarioPorId}
        onSubmit={onSubmit}
      >
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
                <CoverPhoto formik={formik} />
                <ProfilePhoto formik={formik} />
                <ProfileForm formik={formik} />
              </div>
            </div>
          </div>
        )}
      </Formik>
    )
  );
};

export default ProfileSettings;
