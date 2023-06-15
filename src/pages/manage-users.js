// Archivo src\pages\manage-users.js
import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import UserForm from '@/components/Forms/UserForm';
import UserTable from '@/components/UserTable';
import useUsers from '@/hooks/useUsers';

const UsersPage = () => {
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

        <div className="flex flex-col items-center justify-center  ">
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
