// Archivo src\components\Pill.js
import React from 'react';

const Pill = ({ color, text }) => {
  // Usar un objeto de estilos para asignar el color de fondo según el prop color
  const styles = {
    backgroundColor: color === 'green' ? '#10B981' : '#EF4444',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '9999px'
  };

  // Devolver un elemento span con el texto y los estilos
  return <span style={styles}>{text}</span>;
};

export default Pill;
