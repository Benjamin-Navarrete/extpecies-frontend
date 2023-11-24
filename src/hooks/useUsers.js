// Archivo src\hooks\useUsers.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const useUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [roles, setRoles] = useState([]);
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

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      const result = await axios('http://localhost:3500/api/roles');
      setRoles(result.data);
      setLoading(false);
    };

    fetchRoles();
  }, []);

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
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
    // decodificar token
    const { id: id_usuario } = JSON.parse(atob(token.split('.')[1]));
    if (id_usuario === id) {
      toast.error('No puedes eliminar tu propio usuario');
      return;
    }
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

  const handleSubmit = async values => {
    try {
      if (currentUser) {
        // Añadir un bloque then y catch para manejar la promesa devuelta por axios.put
        await axios
          .put(
            `http://localhost:3500/api/usuarios/editUserByAdmin/${currentUser.id}`,
            values
          )
          .then(() => {
            // Si se resuelve correctamente, mostrar un mensaje de éxito y actualizar los datos
            toast.success('Usuario actualizado correctamente.');
            setData(
              data.map(user => (user.id === currentUser.id ? values : user))
            );
          })
          .catch(error => {
            // Si hay un error, mostrar un mensaje de error con el error.response.data.error
            toast.error(error.response.data.error);
          });
      } else {
        // Añadir un bloque then y catch para manejar la promesa devuelta por axios.post
        await axios
          .post('http://localhost:3500/api/usuarios', values)
          .then(({ data: newUser }) => {
            // Si se resuelve correctamente, mostrar un mensaje de éxito y añadir el nuevo usuario a los datos
            toast.success('Usuario creado correctamente.');
            setData([...data, newUser]);
          })
          .catch(error => {
            // Si hay un error, mostrar un mensaje de error con el error.response.data.error
            toast.error(error.response.data.error);
          });
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

  return {
    roles,
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
  };
};

export default useUsers;
