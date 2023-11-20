// Archivo src\components\Modals\LogroModal.js
// Importar React y Swal2
import React from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

// Crear el componente LogroModal
const LogroModal = ({ nombre, icono }) => {
  console.log('Logro renderizandoo');
  // Crear una función para mostrar el modal
  const mostrarModal = () => {
    // Usar Swal.fire para crear el modal
    Swal.fire({
      title: `¡Has obtenido el logro ${nombre}!`,
      imageUrl: icono,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: nombre,
      showConfirmButton: false,
      allowOutsideClick: true
    });
  };

  // Llamar a la función mostrarModal cuando el componente se monta
  React.useEffect(() => {
    mostrarModal();
  }, []);

  // Devolver null porque el componente no tiene nada que renderizar
  return null;
};

// Exportar el componente LogroModal
export default LogroModal;
