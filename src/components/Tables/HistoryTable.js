// Archivo src/components/Tables/HistoryTable.js
import React from 'react';
import DataTable from 'react-data-table-component';

const HistoryTable = ({ data, loading }) => {
  const columns = [
    {
      name: 'Fecha',
      selector: 'fecha',
      sortable: true,
      center: true
    },
    {
      name: 'Hora',
      selector: 'hora',
      sortable: true,
      center: true
    },
    {
      name: 'Especie',
      selector: 'especie',
      sortable: true,
      center: true
    }
  ];

  return (
    <div className="w-full max-w-full p-1 mb-4 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <DataTable
        title="Historial de especies visitadas"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        striped
      />
    </div>
  );
};

export default HistoryTable;
