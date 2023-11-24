// Archivo src\components\Inputs\InputField.js
import { useField } from 'formik';

const InputField = ({ label, type, name, placeholder, autoComplete }) => {
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
        {/* Usar el spread operator para pasar las propiedades del campo al input */}
        <input
          {...field}
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm ${
            meta.touched && meta.error && 'border-red-500'
          }`}
          placeholder={placeholder}
        />
      </div>

      {/* Mostrar el mensaje de error si el campo está tocado y tiene error */}
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};
export default InputField;
