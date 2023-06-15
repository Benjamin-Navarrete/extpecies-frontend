import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const routes = [
  { name: 'Inicio', url: '/', permiso: null },
  { name: 'Mapa', url: '/map', permiso: null },
  { name: 'Ponte a Prueba', url: '/test', permiso: null },
  { name: 'Sobre nosotros', url: '/about', permiso: null },
  { name: 'Gestionar usuarios', url: '/manage-users', permiso: 'MEN_01' },
  { name: 'Gestionar especies', url: '/manage-species', permiso: 'MEN_02' }
];

export default function MainNavbar() {
  const router = useRouter();

  const isActive = href => router.pathname === href;

  const linkClasses = isActive =>
    isActive
      ? 'inline-flex items-center border-b-2 border-emerald-500 px-1 pt-1 text-sm font-medium text-gray-900'
      : 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700';

  const mobileLinkClasses = isActive =>
    isActive
      ? 'block border-l-4 border-emerald-500 bg-emerald-50 py-2 pl-3 pr-4 text-base font-medium text-emerald-700 sm:pl-5 sm:pr-6'
      : 'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6';

  const [permisos, setPermisos] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setPermisos(decodedToken.permisos || []);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setPermisos([]);
    router.push('/'); // o redireccionar a la página que prefieras tras el logout
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
                  <div className="flex-shrink-0 ml-4">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="relative inline-flex items-center rounded-md border border-transparent bg-neutral-200 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                    >
                      <span>Logout</span>
                    </button>
                  </div>
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
