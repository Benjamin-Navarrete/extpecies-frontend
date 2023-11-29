// Archivo src\pages\search-users.js
import React from 'react';
import SearchUsers from '../components/SearchUsers';
import DefaultLayout from '@/layouts/DefaultLayout';

const SearchUsersPage = () => {
  return (
    <div>
      {/* Usar el componente SearchUsers para mostrar la página de búsqueda de usuarios */}
      <DefaultLayout title="Buscar usuarios">
        <SearchUsers />
      </DefaultLayout>
    </div>
  );
};

export default SearchUsersPage;
