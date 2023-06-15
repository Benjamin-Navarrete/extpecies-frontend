// Archivo src\components\Inputs\SelectField.js
import { useField } from 'formik';

const SelectField = ({ label, name, children }) => {
  // Usar useField de Formik para acceder al estado y las funciones del campo
  const [field, meta] = useField(name);

  return (
    <>
      <div className="mt-4">
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        {/* Usar el spread operator para pasar las propiedades del campo al select */}
        <select
          {...field}
          id={name}
          name={name}
          className={`mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm ${
            meta.touched && meta.error && 'border-red-500'
          }`}
          defaultValue=""
        >
          {/* Agregar una opción vacía para que el usuario tenga que seleccionar una opción válida */}
          <option value="" disabled hidden>
            Seleccionar
          </option>

          {/* Renderizar los hijos del componente (las opciones del select) */}
          {children}
        </select>
      </div>

      {/* Mostrar el mensaje de error si el campo está tocado y tiene error */}
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};
export default SelectField;
