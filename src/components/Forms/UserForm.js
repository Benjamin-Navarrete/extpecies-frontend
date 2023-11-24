// Archivo src\components\Forms\UserForm.js
import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '@/components/Inputs/InputField';
import SelectField from '@/components/Inputs/SelectField';
import { countries } from '@/utils/countries';

const UserForm = ({
  modalIsOpen,
  userForm,
  currentUser,
  handleCloseModal,
  handleSubmit
}) => {
  const validationSchema = Yup.object({
    nombres: Yup.string().required('El nombre es obligatorio'),
    apellidos: Yup.string().required('El apellido es obligatorio'),
    correo: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es obligatoria'),
    pais: Yup.string().required('El país es obligatorio')
  });

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      className="max-w-lg mx-auto bg-white rounded-lg p-4  shadow-xl mt-24 mb-24"
    >
      <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        {currentUser ? 'Editar' : 'Crear'} usuario
      </h2>
      <Formik
        initialValues={userForm}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
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
            {currentUser ? null : (
              <InputField
                label="Contraseña"
                type="password"
                name="password"
                autoComplete="current-password"
              />
            )}
            <SelectField
              label="País"
              name="pais"
              placeholder="Selecciona tu país"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="Rol"
              name="nombre_rol"
              placeholder="Selecciona tu rol"
            >
              <option value="">Seleccione un rol</option>
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
              <option value="editor">Editor</option>
            </SelectField>
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-2 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
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
