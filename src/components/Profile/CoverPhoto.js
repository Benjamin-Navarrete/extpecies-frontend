// Archivo src\components\Profile\CoverPhoto.js
import React, { useRef, useState } from 'react';

const CoverPhoto = ({ formik }) => {
  // Crear una referencia al input de tipo file
  const fileInputRef = useRef();

  // Crear un estado para guardar la foto seleccionada
  const [coverPhoto, setCoverPhoto] = useState(null);

  // Crear una función para manejar el cambio de foto
  const handleChangePhoto = e => {
    // Obtener el archivo seleccionado
    const file = e.target.files[0];

    // Validar que el archivo sea de un formato válido
    // Puedes usar otro criterio si quieres
    const formatosValidos = ['image/jpeg', 'image/png'];
    if (!file || !formatosValidos.includes(file.type)) {
      alert('La foto de portada no es válida');
      return;
    }

    // Asignar el archivo al campo del formulario
    formik.setFieldValue('fotoPortada', file);

    // Mostrar la foto seleccionada en el componente
    const reader = new FileReader();
    reader.onload = () => {
      setCoverPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Crear una función para activar el input de tipo file
  const handleClickPhoto = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 bg-gray-100 rounded-lg">
      <img
        // Usar el estado de la foto seleccionada si existe, de lo contrario, usar el valor inicial del formulario
        src={coverPhoto ? coverPhoto : formik.values.fotoPortada}
        alt="Foto de portada"
        className="object-cover w-full h-48 rounded-md"
      />
      <button
        type="button"
        onClick={handleClickPhoto}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        Cambiar foto de portada
      </button>
      <input
        type="file"
        name="fotoPortada"
        id="fotoPortada"
        ref={fileInputRef}
        onChange={handleChangePhoto}
        className="hidden"
      />
    </div>
  );
};

export default CoverPhoto;
