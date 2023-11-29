// Archivo src/components/SearchTable.js
import React from 'react';
import DataTable from 'react-data-table-component';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { EyeIcon } from '@heroicons/react/24/solid';

const SearchTable = ({ data, loading, handleView }) => {
  const columns = [
    {
      name: 'Nombre',
      selector: 'nombres',
      sortable: true,
      center: true
    },
    {
      name: 'Apellido',
      selector: 'apellidos',
      sortable: true,
      center: true
    },
    {
      name: 'País',
      selector: 'pais',
      sortable: true,
      center: true
    },
    {
      name: 'Acciones',
      button: true,
      center: true,
      cell: row => (
        <div className="flex space-x-2">
          <Tippy content="Ver perfil">
            <button
              onClick={() => handleView(row)}
              className="p-1 bg-blue-500 text-white rounded-full"
            >
              <EyeIcon className="h-5 w-5" />
            </button>
          </Tippy>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-full p-1 mb-4 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <DataTable
        title="Resultados de la búsqueda"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        striped
      />
    </div>
  );
};

export default SearchTable;
