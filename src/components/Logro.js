// Archivo src/components/Logro.js
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'; // Importar el archivo CSS de SweetAlert2

const Logro = ({ logro }) => {
  // Crear una variable de estado para controlar si el confeti está activo o no
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    // Verificar si el logro está definido y tiene un nombre
    if (logro && logro.nombre) {
      // Activar el confeti
      setConfettiActive(true);
      // Mostrar una alerta con el nombre y la descripción del logro
      Swal.fire({
        title: `¡Felicidades! Has obtenido el logro ${logro.nombre}`,
        text: logro.descripcion,
        imageUrl: '/img/trophy.svg', // URL de una imagen de un trofeo
        imageWidth: 120, // Ancho de la imagen en píxeles
        imageHeight: 120, // Alto de la imagen en píxeles
        imageAlt: 'Trofeo', // Texto alternativo de la imagen
        confirmButtonText: 'Aceptar',
        customClass: {
          container: 'z-[9998]'
        }
      }).then(result => {
        // Desactivar el confeti cuando se cierra la alerta
        setConfettiActive(false);
      });
    }
  }, [logro]);

  return (
    <>
      {/* Renderizar el confeti solo si está activo */}
      {confettiActive && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          style={{ zIndex: 9999 }}
        />
      )}
    </>
  );
};

export default Logro;
