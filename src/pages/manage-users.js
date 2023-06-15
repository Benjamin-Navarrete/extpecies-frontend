import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios('http://localhost:3001/api/usuarios');
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: 'Nombre',
      selector: 'nombres',
      sortable: true
    },
    // Agrega más columnas de acuerdo a los campos de tus usuarios
    {
      name: 'Acciones',
      button: true,
      cell: row => (
        <div>
          <button onClick={() => handleEdit(row)}>Editar</button>
          <button onClick={() => handleDelete(row.id)}>Eliminar</button>
        </div>
      )
    }
  ];

  const handleEdit = user => {
    // Aquí va tu lógica para editar el usuario
    console.log('Editar usuario: ', user);
  };

  const handleDelete = id => {
    // Aquí va tu lógica para eliminar el usuario
    console.log('Eliminar usuario con ID: ', id);
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <button onClick={handleCreate}>Crear nuevo usuario</button>
      <DataTable
        title="Lista de Usuarios"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
      />
    </div>
  );
};

export default UsersPage;
