// Archivo src\components\Profile\ProfileSettings.js
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { actualizarUsuarioPorId } from '@/api/userApi';
import ProfilePhoto from './ProfilePhoto.js';
import CoverPhoto from './CoverPhoto';
import ProfileForm from './ProfileForm';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ProfileSettings = () => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(null);
  const queryClient = useQueryClient();

  // Obtener el id del usuario logeado
  const { data: usuario } = useQuery('usuario');
  const id = usuario?.id;

  // Crear una constante para la url del servidor
  const serverUrl = 'http://localhost:3500';

  // Usar un efecto para actualizar las urls de las fotos cuando cambie el usuarioPorId
  useEffect(() => {
    if (usuario) {
      setProfilePhotoUrl(`${serverUrl}/${usuario.fotoPerfil}`);
      setCoverPhotoUrl(`${serverUrl}/${usuario.fotoPortada}`);
    }
  }, [usuario]);

  // Crear la mutación con react query para actualizar el usuario
  const { mutate: actualizarUsuario, error } = useMutation(
    actualizarUsuarioPorId,
    {
      // Actualizar el estado del usuario en el caché de react query
      onSuccess: data => {
        queryClient.invalidateQueries('usuarioPorId');
        queryClient.invalidateQueries('usuario');
        queryClient.setQueryData('usuarioPorId', data);
        toast.success('Usuario actualizado exitosamente');
        // esperar 1 segundo y recargar la página
        setTimeout(() => {
          window.location.reload();
        }, 600);
      },
      onError: () => {
        toast.error('Ha ocurrido un error');
      }
    }
  );

  // Pasar las variables anteriores como el valor inicial del formulario
  const onSubmit = values => {
    // Pasar el id del usuario a la función actualizarUsuario
    actualizarUsuario({ id, values });
  };

  const validationSchema = yup.object().shape({
    nombres: yup.string().required('El nombre es obligatorio')
  });

  // Crear una función para renderizar el contenido según el estado del useQuery
  const renderContent = () => {
    if (error) {
      return <div className="text-center">Ha ocurrido un error</div>;
    } else {
      return (
        <Formik
          // Pasar las rutas completas de las fotos como el valor inicial del formulario
          initialValues={{
            ...usuario,
            fotoPerfil: profilePhotoUrl,
            fotoPortada: coverPhotoUrl
          }}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={validationSchema}
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
                <div className="mt-6 flex flex-col">
                  <CoverPhoto formik={formik} />
                  <ProfilePhoto formik={formik} />
                  <ProfileForm formik={formik} />
                </div>
              </div>
            </div>
          )}
        </Formik>
      );
    }
  };

  return renderContent();
};

export default ProfileSettings;
