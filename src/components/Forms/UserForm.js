import React from 'react';
import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '@/components/Inputs/InputField';
import CheckboxField from '@/components/Inputs/CheckBoxField';

const UserForm = ({
  modalIsOpen,
  userForm,
  currentUser,
  handleCloseModal,
  handleSubmit,
  handleChange
}) => {
  const validationSchema = Yup.object({
    nombres: Yup.string().required('El nombre es obligatorio'),
    apellidos: Yup.string().required('El apellido es obligatorio'),
    correo: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
    telefono: Yup.string().required('El teléfono es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es obligatoria'),
    pais: Yup.string().required('El país es obligatorio'),
    boletinInformativo: Yup.boolean()
  });

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
      <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        {currentUser ? 'Editar' : 'Crear'} usuario
      </h2>
      <Formik
        initialValues={userForm}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3">
            <InputField
              label="Nombres"
              type="text"
              name="nombres"
              autoComplete="name"
            />
            <InputField label="Apellidos" type="text" name="apellidos" />
            <InputField
              label="Correo"
              type="email"
              name="correo"
              autoComplete="email"
            />
            <InputField label="Teléfono" type="tel" name="telefono" />
            <InputField
              label="Contraseña"
              type="password"
              name="password"
              autoComplete="current-password"
            />
            <InputField label="País" type="text" name="pais" />

            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserForm;
