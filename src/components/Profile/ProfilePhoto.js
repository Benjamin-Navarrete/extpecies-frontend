// Archivo src\components\Profile\ProfilePhoto.js
import React, { useRef, useState } from 'react';

const ProfilePhoto = ({ formik }) => {
  // Crear una referencia al input de tipo file
  const fileInputRef = useRef();

  // Crear un estado para guardar la foto seleccionada
  const [profilePhoto, setProfilePhoto] = useState(formik.values.fotoPerfil);

  // Crear una función para manejar el cambio de foto
  const handleChangePhoto = e => {
    // Obtener el archivo seleccionado
    const file = e.target.files[0];

    // Validar que el archivo sea de un formato válido
    // Puedes usar otro criterio si quieres
    const formatosValidos = ['image/jpeg', 'image/png'];
    if (!file || !formatosValidos.includes(file.type)) {
      alert('La foto de perfil no es válida');
      return;
    }

    // Asignar el archivo al campo del formulario
    formik.setFieldValue('fotoPerfil', file);

    // Mostrar la foto seleccionada en el componente
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result);
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
        src={profilePhoto}
        alt="Foto de perfil"
        className="object-cover w-32 h-32 rounded-full"
      />
      <button
        type="button"
        onClick={handleClickPhoto}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        Cambiar foto de perfil
      </button>
      <input
        type="file"
        name="fotoPerfil"
        id="fotoPerfil"
        ref={fileInputRef}
        onChange={handleChangePhoto}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhoto;
