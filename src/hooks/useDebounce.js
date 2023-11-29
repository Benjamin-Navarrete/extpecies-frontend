// Archivo src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

// Crear una función que reciba un valor y un tiempo de espera
const useDebounce = (value, delay) => {
  // Crear un estado para guardar el valor debounced
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Usar el hook useEffect para actualizar el valor debounced cada vez que cambie el valor original
  useEffect(() => {
    // Crear un temporizador que actualice el valor debounced después del tiempo de espera
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el temporizador cuando se desmonte el componente o cuando cambie el valor original
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Agregar el valor y el tiempo de espera como dependencias del useEffect

  // Devolver el valor debounced
  return debouncedValue;
};

export default useDebounce;
