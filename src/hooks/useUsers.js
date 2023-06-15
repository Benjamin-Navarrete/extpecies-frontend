import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = () => {
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

  return {
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
