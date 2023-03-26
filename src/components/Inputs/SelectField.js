const SelectField = ({ label, name, children }) => (
  <>
    <div className="mt-4">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
        defaultValue="Chile"
      >
        {children}
      </select>
    </div>
  </>
);

export default SelectField;
