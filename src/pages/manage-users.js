import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultLayout from '@/layouts/DefaultLayout';
import UserForm from '@/components/Forms/UserForm';
import UserTable from '@/components/UserTable';
import useUsers from '@/hooks/useUsers';

const UsersPage = () => {
  const router = useRouter();
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  const {
    data,
    loading,
    modalIsOpen,
    userForm,
    currentUser,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCloseModal,
    handleSubmit,
    handleChange
  } = useUsers();

  useEffect(() => {
    const checkPermissions = () => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const { permisos } = JSON.parse(atob(token.split('.')[1]));

      if (!permisos.includes('MEN_01')) {
        toast.error('No tienes permisos para ver esta página');
        setTimeout(() => {
          router.push('/login');
        }, 20000); // Tiempo de espera antes de la redirección
        return;
      }

      setHasPermissions(true);
      setLoadingPermissions(false);
    };

    checkPermissions();
  }, []);

  // Si los permisos aún no han sido cargados, renderizar un componente de carga o nada
  if (loadingPermissions) {
    return null; // O reemplaza esto con un componente de carga
  }

  // Si el usuario no tiene permisos, redirige a login
  if (!hasPermissions) {
    router.push('/login');
    return null;
  }

  return (
    <DefaultLayout>
      <div className="pb-20 pt-5">
        <div className="text-right py-2">
          <button
            onClick={handleCreate}
            className="mb-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            Crear nuevo usuario
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <UserTable
            data={data}
            loading={loading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <UserForm
            modalIsOpen={modalIsOpen}
            userForm={userForm}
            currentUser={currentUser}
            handleCloseModal={handleCloseModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
