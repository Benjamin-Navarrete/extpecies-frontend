const CheckboxField = ({ label, name }) => (
  <div className="flex items-center my-5">
    <input
      id={name}
      name={name}
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
    />
    <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
      {label}
    </label>
  </div>
);

export default CheckboxField;
