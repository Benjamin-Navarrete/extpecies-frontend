const InputField = ({ label, type, name, placeholder, autoComplete }) => (
  <>
    <div className="mt-4">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  </>
);

export default InputField;
