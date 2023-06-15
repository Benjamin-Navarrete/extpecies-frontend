// Archivo src\components\Forms\UserForm.js
import React from 'react';
import Modal from 'react-modal';

const UserForm = ({
  modalIsOpen,
  userForm,
  currentUser,
  handleCloseModal,
  handleSubmit,
  handleChange
}) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
      <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        {currentUser ? 'Editar' : 'Crear'} usuario
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="text-gray-700">Nombres:</span>
          <input
            name="nombres"
            value={userForm.nombres}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Apellidos:</span>
          <input
            name="apellidos"
            value={userForm.apellidos}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Correo:</span>
          <input
            name="correo"
            value={userForm.correo}
            onChange={handleChange}
            required
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Teléfono:</span>
          <input
            name="telefono"
            value={userForm.telefono}
            onChange={handleChange}
            required
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Contraseña:</span>
          <input
            name="password"
            value={userForm.password}
            onChange={handleChange}
            required
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">País:</span>
          <input
            name="pais"
            value={userForm.pais}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Boletín informativo:</span>
          <input
            name="boletinInformativo"
            checked={userForm.boletinInformativo}
            onChange={handleChange}
            type="checkbox"
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
