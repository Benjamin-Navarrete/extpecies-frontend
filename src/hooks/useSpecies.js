// Archivo src\hooks\useSpecies.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useSpecies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentSpecies, setCurrentSpecies] = useState(null);
  const [roles, setRoles] = useState([]);
  const [speciesForm, setSpeciesForm] = useState({
    nombreComun: '',
    nombreCientifico: '',
    imagen: '',
    reino: '',
    filo: '',
    clase: '',
    orden: '',
    familia: '',
    genero: '',
    estadoConservacion: '',
    sitio: '',
    numeroLocaciones: '',
    limiteElevacionSuperior: '',
    limiteElevacionInferior: '',
    descripcionGeografica: '',
    tendenciaPoblacion: '',
    detallesPoblacion: '',
    sistemaHabitat: '',
    tiposHabitat: '',
    detallesHabitat: '',
    detallesAmenazas: '',
    accionesConservacion: '',
    bibliografia: '',
    latitud: '',
    longitud: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(
        'http://localhost:3500/api/especies/all/allSpecies'
      );
      console.log('result.data', result.data);
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
    setCurrentSpecies(null);
    setSpeciesForm({
      nombreComun: '',
      nombreCientifico: '',
      imagen: '',
      reino: '',
      filo: '',
      clase: '',
      orden: '',
      familia: '',
      genero: '',
      estadoConservacion: '',
      sitio: '',
      numeroLocaciones: '',
      limiteElevacionSuperior: '',
      limiteElevacionInferior: '',
      descripcionGeografica: '',
      tendenciaPoblacion: '',
      detallesPoblacion: '',
      sistemaHabitat: '',
      tiposHabitat: '',
      detallesHabitat: '',
      detallesAmenazas: '',
      accionesConservacion: '',
      bibliografia: '',
      latitud: '',
      longitud: ''
    });
    setIsOpen(true);
  };

  const handleEdit = species => {
    setCurrentSpecies(species);
    setSpeciesForm(species);
    setIsOpen(true);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta especie?')) {
      try {
        await axios.delete(`http://localhost:3500/api/especies/${id}`);
        setData(data.filter(species => species.id !== id));
      } catch (error) {
        alert('Hubo un error al eliminar la especie');
      }
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async values => {
    try {
      if (currentSpecies) {
        // Añadir un bloque then y catch para manejar la promesa devuelta por axios.put
        await axios
          .put(
            `http://localhost:3500/api/especies/${currentSpecies.id}`,
            values
          )
          .then(() => {
            // Si se resuelve correctamente, mostrar un mensaje de éxito y actualizar los datos
            toast.success('Especie actualizada correctamente.');
            setData(
              data.map(species =>
                species.id === currentSpecies.id ? values : species
              )
            );
          })
          .catch(error => {
            // Si hay un error, mostrar un mensaje de error con el error.response.data.error
            toast.error(error.response.data.error);
          });
      } else {
        // Añadir un bloque then y catch para manejar la promesa devuelta por axios.post
        await axios
          .post('http://localhost:3500/api/especies', values) // Cambiar la ruta de usuarios a especies
          .then(({ data: newSpecies }) => {
            // Si se resuelve correctamente, mostrar un mensaje de éxito y añadir la nueva especie a los datos // Cambiar el texto del toast y el comentario
            toast.success('Especie creada correctamente.');
            setData([...data, newSpecies]);
          })
          .catch(error => {
            // Si hay un error, mostrar un mensaje de error con el error.response.data.error
            toast.error(error.response.data.error);
          });
      }
      setIsOpen(false);
    } catch (error) {
      alert('Hubo un error al guardar la especie');
    }
  };

  const handleChange = event => {
    setSpeciesForm({
      ...speciesForm,
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
    speciesForm,
    currentSpecies,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCloseModal,
    handleSubmit,
    handleChange
  };
};

export default useSpecies;
