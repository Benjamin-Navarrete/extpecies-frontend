// Archivo src\components\Inputs\CheckboxField.js
import { useField } from 'formik';

const CheckboxField = ({ label, name }) => {
  // Usar useField de Formik para acceder al estado y las funciones del campo
  const [field, meta] = useField(name);

  return (
    <div className="flex items-center my-5">
      {/* Usar el spread operator para pasar las propiedades del campo al input */}
      <input
        {...field}
        id={name}
        name={name}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 ${
          meta.touched && meta.error && 'border-red-500'
        }`}
      />

      <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>

      {/* Mostrar el mensaje de error si el campo está tocado y tiene error */}
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default CheckboxField;
