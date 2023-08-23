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

import { UserCircleIcon } from '@heroicons/react/24/outline';

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

export default function MainNavbar() {
  const router = useRouter();

  const isActive = href => router.pathname === href;

  const linkClasses = isActive =>
    isActive
      ? 'inline-flex items-center border-b-2 border-emerald-500 px-1 pt-1 text-sm font-medium text-gray-900'
      : 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700';

  const [permisos, setPermisos] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setPermisos(decodedToken.permisos || []);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    // Cuando termine de cargar los permisos, actualiza el estado de carga
    setIsLoading(false);
  }, []);

  // En la sección de renderizado
  if (isLoading) {
    return <p>Cargando...</p>; // Aquí puedes renderizar un spinner de carga o algo similar
  }

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setPermisos([]);
    toast.success('Sesión cerrada con éxito');
    router.push('/');
  };

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
                  {routes
                    .filter(
                      route =>
                        !route.permiso || permisos.includes(route.permiso)
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
              </div>
              <div className="flex items-center">
                {!isAuthenticated ? (
                  <>
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
                            Administrador
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
                                Seguridad
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
