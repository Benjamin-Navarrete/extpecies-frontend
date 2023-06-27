// Archivo src\pages\manage-species.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultLayout from '@/layouts/DefaultLayout';
import SpeciesTable from '@/components/Tables/SpeciesTable';
import SpecieForm from '@/components/Forms/SpecieForm';
import useSpecies from '@/hooks/useSpecies';

const SpeciesPage = () => {
  const router = useRouter();
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  const {
    roles,
    data,
    loading,
    modalIsOpen,
    speciesForm,
    currentSpecies,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCloseModal,
    handleSubmit,
    handleChange
  } = useSpecies();

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
            Crear nueva especie
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <SpeciesTable
            data={data}
            loading={loading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <SpecieForm
            modalIsOpen={modalIsOpen}
            speciesForm={speciesForm}
            currentSpecies={currentSpecies}
            handleCloseModal={handleCloseModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            roles={roles}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SpeciesPage;
