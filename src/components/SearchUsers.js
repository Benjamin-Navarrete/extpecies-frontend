// Archivo src/components/SearchUsers.js
import React, { useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import SearchTable from './SearchTable';

const SearchUsers = () => {
  // Crear un estado para guardar el valor del input
  const [search, setSearch] = useState('');

  // Crear un estado para guardar los resultados de la búsqueda
  const [results, setResults] = useState([]);

  // Crear un estado para guardar el estado de carga
  const [loading, setLoading] = useState(false);

  // Usar el hook useDebounce para evitar hacer peticiones innecesarias
  // El valor de debounce se puede cambiar según se prefiera
  const debouncedSearch = useDebounce(search, 500);

  // Usar el hook useEffect para hacer una petición al backend cada vez que cambie el valor de debouncedSearch
  useEffect(() => {
    // Si el valor de debouncedSearch está vacío, no hacer nada
    if (!debouncedSearch) return;

    // Si el valor de debouncedSearch no está vacío, hacer la petición
    // Usar una función asíncrona para usar await
    const fetchResults = async () => {
      // Cambiar el estado de carga a true
      setLoading(true);

      // Hacer la petición usando fetch, axios o cualquier otra librería
      // Usar el valor de debouncedSearch como parámetro de búsqueda
      // Usar un try-catch para manejar los errores
      try {
        const response = await fetch(
          `http://localhost:3500/api/usuarios/search/${debouncedSearch}`
        );
        const data = await response.json();

        // Si la respuesta es exitosa, guardar los datos en el estado de resultados
        if (response.ok) {
          setResults(data);
        } else {
          // Si la respuesta no es exitosa, mostrar un mensaje de error
          console.error(data.message);
        }
      } catch (error) {
        // Si ocurre un error, mostrarlo en la consola
        console.error(error);
      }

      // Cambiar el estado de carga a false
      setLoading(false);
    };

    // Llamar a la función asíncrona
    fetchResults();
  }, [debouncedSearch]); // Agregar debouncedSearch como dependencia del useEffect

  // Crear una función para manejar el cambio del input
  const handleChange = e => {
    // Obtener el valor del input
    const value = e.target.value;

    // Guardar el valor en el estado de búsqueda
    setSearch(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Buscar usuarios</h1>
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Ingresa un nombre, apellido o username"
          className="w-full max-w-lg p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex items-center justify-center">
        {/* Usar el componente SearchTable para mostrar los resultados de la búsqueda */}
        {/* Pasar los props de data, loading y handleView */}
        {/* El prop handleView debe redirigir al perfil del usuario seleccionado */}
        <SearchTable
          data={results}
          loading={loading}
          handleView={row => {
            // Redirigir al perfil del usuario seleccionado
            window.open(`/profile/${row.username}/logros`, '_blank');
          }}
        />
      </div>
    </div>
  );
};

export default SearchUsers;
