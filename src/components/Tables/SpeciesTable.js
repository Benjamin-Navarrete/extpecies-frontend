// Archivo src\components\Tables\SpeciesTable.js
import React from 'react';
import DataTable from 'react-data-table-component';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';

const SpeciesTable = ({ data, loading, handleEdit, handleDelete }) => {
  const columns = [
    {
      name: 'Nombre común',
      selector: 'nombreComun',
      sortable: true
    },
    {
      name: 'Estado de conservación',
      selector: 'estadoConservacion',
      sortable: true
    },
    {
      name: 'Acciones',
      button: true,
      cell: row => (
        <div className="flex space-x-2">
          <Tippy content="Editar">
            <button
              onClick={() => handleEdit(row)}
              className="p-1 bg-blue-500 text-white rounded-full"
            >
              <PencilSquareIcon className="h-5 w-5" />
            </button>
          </Tippy>
          <Tippy content="Eliminar">
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1 bg-red-500 text-white rounded-full"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </Tippy>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-full p-1 mb-4 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <DataTable
        title="Lista de Especies"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        striped
      />
    </div>
  );
};

export default SpeciesTable;
