// Archivo src\components\Profile\ProfileSettings.js
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { actualizarUsuarioPorId, obtenerUsuarioPorId } from '@/api/userApi';
import ProfilePhoto from './ProfilePhoto.js';
import CoverPhoto from './CoverPhoto';
import ProfileForm from './ProfileForm';
import { toast } from 'react-toastify';

const ProfileSettings = () => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(null);
  const queryClient = useQueryClient();

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

  // Crear la mutación con react query para actualizar el usuario
  const {
    mutate: actualizarUsuario,
    isLoading: actualizandoUsuario,
    error: errorActualizandoUsuario,
    isSuccess: exitoActualizandoUsuario
  } = useMutation(actualizarUsuarioPorId, {
    // Actualizar el estado del usuario en el caché de react query
    onSuccess: data => {
      toast.success('Usuario actualizado');
      queryClient.invalidateQueries('usuarioPorId');
      queryClient.setQueryData('usuarioPorId', data);
      setProfilePhotoUrl(data.fotoPerfil);
      setCoverPhotoUrl(data.fotoPortada);
    },
    onError: () => {
      toast.error('Ha ocurrido un error');
    }
  });

  // Pasar las variables anteriores como el valor inicial del formulario
  const onSubmit = values => {
    // Pasar el id del usuario a la función actualizarUsuario
    actualizarUsuario({ id, values });
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
