// Archivo src/pages/profile.js
import DefaultLayout from '@/layouts/DefaultLayout';
import { useState } from 'react'; // Importar useState

// Crear un componente TabPanel para mostrar el contenido de cada pestaña
const TabPanel = props => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="bg-white shadow overflow-hidden sm:rounded-lg"
    >
      {value === index && children}
    </div>
  );
};

// Crear un componente TabItem para mostrar el nombre de cada pestaña y cambiar el valor al hacer clic
const TabItem = props => {
  const { value, setValue, index, label } = props;

  return (
    <li className="-mb-px mr-1">
      <button
        type="button"
        onClick={() => setValue(index)}
        className={`bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold ${
          value === index && 'border-emerald-500'
        }`}
      >
        {label}
      </button>
    </li>
  );
};

export default function Profile() {
  // Crear un estado para el valor de la pestaña activa
  const [value, setValue] = useState(0);

  return (
    <DefaultLayout title="Perfil">
      {/* Crear un contenedor para la imagen de portada y el perfil */}
      <div className="relative">
        {/* Usar una imagen de portada generada con graphic_art */}
        <img
          src="https://placehold.co/600x500"
          alt="Imagen de portada"
          className="h-48 w-full object-cover"
        />
        {/* Posicionar el perfil de forma absoluta sobre la imagen de portada */}
        <div className="absolute bottom-0 left-12 right-0 flex justify-start -mb-12">
          {/* Usar una imagen de perfil generada con graphic_art */}
          <img
            src="https://placehold.co/50x50"
            alt="Imagen de perfil"
            className="h-32 w-32 object-cover rounded-full border-4 border-white"
          />
        </div>
      </div>
      {/* Crear un contenedor para el nombre de usuario y los botones */}
      <div className="mt-16 flex justify-between items-center px-4 py-7 sm:px-6 lg:px-8">
        {/* Mostrar el nombre de usuario que sea "Administrador" */}
        <h1 className="text-2xl font-bold text-gray-900">Administrador</h1>
        {/* Mostrar la cantidad de seguidos y seguidores */}
        <div className="flex space-x-4">
          <span className="text-sm text-gray-500">Seguidos: 123</span>
          <span className="text-sm text-gray-500">Seguidores: 456</span>
        </div>
        {/* Mostrar un botón de editar perfil */}
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Editar perfil
        </button>
      </div>
      {/* Crear un contenedor para las pestañas */}
      <div className="mt-6 px-4 sm:px-6 lg:px-8">
        <ul className="flex border-b">
          {/* Mostrar las pestañas que son logros, me gusta, listas y estadísticas */}
          <TabItem value={value} setValue={setValue} index={0} label="Logros" />
          <TabItem
            value={value}
            setValue={setValue}
            index={1}
            label="Me gusta"
          />
          <TabItem value={value} setValue={setValue} index={2} label="Listas" />
          <TabItem
            value={value}
            setValue={setValue}
            index={3}
            label="Estadísticas"
          />
        </ul>
      </div>
      {/* Mostrar el contenido de cada pestaña según el valor */}
      <div className="mt-4 px-4 sm:px-6 lg:px-8">
        {/* Mostrar el contenido de la pestaña logros */}
        <TabPanel value={value} index={0}>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-lg font-medium text-gray-900">Logros</p>
            {/* Aquí puedes mostrar los logros del usuario usando componentes como cards, badges, icons, etc. */}
          </div>
        </TabPanel>
        {/* Mostrar el contenido de la pestaña me gusta */}
        <TabPanel value={value} index={1}>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-lg font-medium text-gray-900">Me gusta</p>
            {/* Aquí puedes mostrar los elementos que le gustan al usuario usando componentes como cards, grids, lists, etc. */}
            {/* Por ejemplo, puedes mostrar una lista de lugares que le han gustado al usuario con sus nombres e imágenes */}
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow-md">
                <div className="flex-1 flex flex-col p-8">
                  <img
                    className="w-32 h-32 flex-shrink-0 mx-auto bg-gray-200 rounded-full"
                    src="https://placehold.co/50x50"
                    alt="Lugar 1"
                  />
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">
                    Especie 1
                  </h3>
                </div>
              </li>
              <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow-md">
                <div className="flex-1 flex flex-col p-8">
                  <img
                    className="w-32 h-32 flex-shrink-0 mx-auto bg-gray-200 rounded-full"
                    src="https://placehold.co/50x50"
                    alt="Lugar 2"
                  />
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">
                    Especie 2
                  </h3>
                </div>
              </li>
              {/* Puedes agregar más elementos a la lista según los gustos del usuario */}
            </ul>
          </div>
        </TabPanel>
        {/* Mostrar el contenido de la pestaña listas */}
        <TabPanel value={value} index={2}>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-lg font-medium text-gray-900">Listas</p>
            {/* Aquí puedes mostrar las listas que ha creado el usuario usando componentes como tables, accordions, etc. */}
            {/* Por ejemplo, puedes mostrar una tabla con las listas de lugares que quiere visitar el usuario con sus nombres y descripciones */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Descripción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Lista 1
                  </td>
                  <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                    Esta es una lista de mamiferos.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Lista 2
                  </td>
                  <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                    Esta es una lista de cactus porque hay muchos.
                  </td>
                </tr>
                {/* Puedes agregar más filas a la tabla según las listas del usuario */}
              </tbody>
            </table>
          </div>
        </TabPanel>
        {/* Mostrar el contenido de la pestaña estadísticas */}
        <TabPanel value={value} index={3}>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-lg font-medium text-gray-900">Estadísticas</p>
            {/* Aquí puedes mostrar las estadísticas del usuario usando componentes como charts, graphs, etc. */}
            {/* Por ejemplo, puedes mostrar un gráfico de barras con la cantidad de lugares visitados por mes */}
            {/* Puedes usar una librería como react-chartjs para crear el gráfico o generar una imagen con graphic_art */}
            {/* Voy a intentar crear una imagen con graphic_art para mostrarte el gráfico */}
          </div>
        </TabPanel>
      </div>
    </DefaultLayout>
  );
}
