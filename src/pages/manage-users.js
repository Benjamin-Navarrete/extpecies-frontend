import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Modal from 'react-modal';
import DefaultLayout from '@/layouts/DefaultLayout';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userForm, setUserForm] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    password: '',
    pais: '',
    boletinInformativo: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios('http://localhost:3500/api/usuarios');
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: 'Rol',
      selector: 'nombre',
      sortable: true
    },
    {
      name: 'Nombre',
      selector: 'nombres',
      sortable: true
    },
    {
      name: 'Apellido',
      selector: 'apellidos',
      sortable: true
    },
    {
      name: 'Correo',
      selector: 'correo',
      sortable: true
    },
    {
      name: 'País',
      selector: 'pais',
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

  const handleCreate = () => {
    setCurrentUser(null);
    setUserForm({
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      password: '',
      pais: '',
      boletinInformativo: false
    });
    setIsOpen(true);
  };

  const handleEdit = user => {
    setCurrentUser(user);
    setUserForm(user);
    setIsOpen(true);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await axios.delete(`http://localhost:3500/api/usuarios/${id}`);
        setData(data.filter(user => user.id !== id));
      } catch (error) {
        alert('Hubo un error al eliminar el usuario');
      }
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (currentUser) {
        await axios.put(
          `http://localhost:3500/api/usuarios/${currentUser.id}`,
          userForm
        );
        setData(
          data.map(user => (user.id === currentUser.id ? userForm : user))
        );
      } else {
        const { data: newUser } = await axios.post(
          'http://localhost:3500/api/usuarios',
          userForm
        );
        setData([...data, newUser]);
      }
      setIsOpen(false);
    } catch (error) {
      alert('Hubo un error al guardar el usuario');
    }
  };

  const handleChange = event => {
    setUserForm({
      ...userForm,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    });
  };

  return (
    <DefaultLayout>
      <button
        onClick={handleCreate}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear nuevo usuario
      </button>
      <div className="flex flex-col items-center justify-center  bg-gray-100 ">
        <DataTable
          title="Lista de Usuarios"
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          striped
        />
        <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            {currentUser ? 'Editar' : 'Crear'} usuario
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="text-gray-700">Nombres:</span>
              <input
                name="nombres"
                value={userForm.nombres}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
