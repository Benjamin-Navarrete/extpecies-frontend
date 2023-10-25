// Archivo src\components\MainNavbar.js
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import classnames from 'classnames';

// Importar los iconos desde las librerías externas
import { UserCircleIcon } from '@heroicons/react/24/outline';

import { useQuery, useQueryClient } from 'react-query';

// Definir las rutas del menú con sus nombres, urls y permisos
const routes = [
  { name: 'Inicio', url: '/', permiso: null },
  { name: 'Mapa', url: '/map', permiso: null },
  { name: 'Ponte a Prueba', url: '/test', permiso: null },
  { name: 'Sobre nosotros', url: '/about', permiso: null },
  { name: 'Gestionar usuarios', url: '/manage-users', permiso: 'MEN_01' },
  {
    name: 'Gestionar especies',
    url: '/manage-species',
    permiso: 'MEN_02'
  },
  {
    name: 'Historial',
    url: '/history',
    permiso: 'MEN_03'
  }
];

// Crear el componente MainNavbar que renderiza la barra de navegación principal
export default function MainNavbar() {
  // Obtener la instancia del enrutador de next.js
  const router = useRouter();
  const queryClient = useQueryClient();

  // Se extraen los datos del usuario con useQuery para utilizar en el menú
  const { data: usuario } = useQuery('usuario');

  // Crear una función que verifica si una ruta está activa según la ruta actual
  const isActive = href => router.pathname === href;

  const [permisos, setPermisos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Crear un efecto que se ejecuta cuando se monta el componente
  useEffect(() => {
    // Obtener el token desde el local storage
    const token = Cookies.get('token');
    if (token) {
      // Decodificar el token y obtener los permisos y los datos del usuario
      const decodedToken = jwtDecode(token);
      setPermisos(decodedToken.permisos || []);
      queryClient.setQueryData('usuario', decodedToken.usuario);

      // Actualizar el estado de autenticación a verdadero
      setIsAuthenticated(true);
    } else {
      // Actualizar el estado de autenticación a falso
      setIsAuthenticated(false);
    }
    // Cuando termine de cargar los permisos, actualiza el estado de carga a falso
    setIsLoading(false);
  }, []);

  // Crear una función para manejar el cierre de sesión del usuario
  const handleLogout = () => {
    // Eliminar el token de las cookies
    Cookies.remove('token');
    // Actualizar el estado de autenticación a falso
    setIsAuthenticated(false);
    // Vaciar el estado de permisos
    setPermisos([]);

    // Remover datos de usuario
    queryClient.removeQueries('usuario');

    // Mostrar un mensaje de éxito
    toast.success('Sesión cerrada con éxito');
    // Redirigir al usuario a la página de inicio
    router.push('/');
  };

  // Crear una función que devuelve las clases css para los enlaces según si están activos o no
  const linkClasses = isActive =>
    isActive
      ? 'inline-flex items-center border-b-2 border-emerald-500 px-1 pt-1 text-sm font-medium text-gray-900'
      : 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700';

  // En la sección de renderizado
  if (isLoading) {
    // Si el componente está cargando, mostrar un mensaje o un spinner
    return <p>Cargando...</p>;
  }

  // Retornar el componente que renderiza la barra de navegación con los componentes de headless ui y heroicons
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/logo.png"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/logo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Iterar sobre las rutas del menú y filtrar las que tienen permiso o no requieren permiso */}
                  {routes
                    .filter(
                      route =>
                        !route.permiso || permisos.includes(route.permiso)
                    )
                    .map(route => (
                      // Renderizar un enlace con el nombre y la url de la ruta, usando las clases css según si está activa o no
                      <Link
                        key={route.url}
                        href={route.url}
                        className={linkClasses(isActive(route.url))}
                      >
                        {route.name}
                      </Link>
                    ))}
                </div>
              </div>
              <div className="flex items-center">
                {/* Verificar si el usuario no está autenticado */}
                {!isAuthenticated ? (
                  <>
                    {/* Renderizar los botones de registrarse y login */}
                    <div className="flex-shrink-0">
                      <Link href="/register">
                        <button
                          type="button"
                          className="relative inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                          <span>Registrarse</span>
                        </button>
                      </Link>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <Link href="/login">
                        <button
                          type="button"
                          className="relative inline-flex items-center rounded-md border border-transparent bg-neutral-200 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                        >
                          <span>Login</span>
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3 z-[999]">
                      <div>
                        <Menu.Button className="flex rounded-full items-center bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="text-sm font-medium text-gray-600 mr-3">
                            {/* Reemplazar el texto "Administrador" por el nombre del usuario o un texto por defecto */}
                            {usuario ? usuario.nombres : 'Usuario'}
                          </span>
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon className="h-8 w-8 text-gray-600" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classnames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Perfil
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/likes"
                                className={classnames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Me gusta
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/lists"
                                className={classnames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Listas
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/statistics"
                                className={classnames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Estadísticas
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/configuration"
                                className={classnames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Configuración
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/security"
                                className={classnames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Privacidad
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleLogout}
                                className={classnames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {routes
                .filter(
                  route => !route.permiso || permisos.includes(route.permiso)
                )
                .map(route => (
                  <Link
                    key={route.url}
                    href={route.url}
                    className={linkClasses(isActive(route.url))}
                  >
                    {route.name}
                  </Link>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
