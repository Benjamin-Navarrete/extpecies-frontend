// Archivo src\components\Profile\ProfileSettings.js
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useQuery } from 'react-query';
import { obtenerUsuarioPorId } from '@/api/userApi';
import ProfilePhoto from './ProfilePhoto.js';
import CoverPhoto from './CoverPhoto';
import ProfileForm from './ProfileForm';

const ProfileSettings = () => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(null);

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

  const serverUrl = 'http://localhost:3500';

  useEffect(() => {
    if (usuarioPorId) {
      setProfilePhotoUrl(`${serverUrl}/${usuarioPorId.fotoPerfil}`);
      setCoverPhotoUrl(`${serverUrl}/${usuarioPorId.fotoPortada}`);
    }
  }, [usuarioPorId]);

  // Pasar las variables anteriores como el valor inicial del formulario
  const onSubmit = values => {
    // Aquí puedes manejar la lógica para enviar los datos del formulario.
    console.log('Valores del formulario:', values);
  };

  return isLoading ? (
    <div className="text-center">Cargando...</div>
  ) : error ? (
    <div className="text-center">Ha ocurrido un error</div>
  ) : (
    <Formik
      // Pasar las rutas completas de las fotos como el valor inicial del formulario
      initialValues={{
        ...usuarioPorId,
        fotoPerfil: profilePhotoUrl,
        fotoPortada: coverPhotoUrl
      }}
      onSubmit={onSubmit}
      enableReinitialize={true}
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
  );
};

export default ProfileSettings;
