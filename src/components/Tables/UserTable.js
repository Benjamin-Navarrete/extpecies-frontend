// Archivo src\components\UserTable.js
import React from 'react';
import DataTable from 'react-data-table-component';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import {
  ArrowsRightLeftIcon,
  PencilSquareIcon
} from '@heroicons/react/24/solid';
import Pill from '../Pill';

const UserTable = ({ data, loading, handleEdit, handleToggle }) => {
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
      name: 'Correo',
      selector: 'correo',
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
      name: 'Estado',
      button: true,
      center: true,
      cell: row => (
        // Agregar una nueva columna que muestre el estado del usuario con un componente Pill
        <Pill
          color={row.estado ? 'green' : 'red'}
          text={row.estado ? 'Activado' : 'Desactivado'}
        />
      )
    },
    {
      name: 'Acciones',
      button: true,
      center: true,
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
          <Tippy content="Cambiar estado">
            <button
              onClick={() => handleToggle(row.id)}
              className="p-1 bg-yellow-500 text-white rounded-full"
            >
              {row.estado ? (
                <ArrowsRightLeftIcon className="h-5 w-5" />
              ) : (
                <ArrowsRightLeftIcon className="h-5 w-5" />
              )}
            </button>
          </Tippy>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-full p-1 mb-4 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <DataTable
        title="Lista de Usuarios"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        striped
      />
    </div>
  );
};

export default UserTable;
