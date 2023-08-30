// Archivo src\pages\settings.js
import React, { useState } from 'react';
import {
  LockClosedIcon,
  KeyIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import DefaultLayout from '@/layouts/DefaultLayout';
import ProfileSettings from '@/components/Profile/ProfileSettings';
import Security from '@/components/Profile/Security';
import ChangePassword from '@/components/Profile/ChangePassword';

const subNavigation = [
  { name: 'Perfil', icon: UserCircleIcon, component: <ProfileSettings /> },
  { name: 'Seguridad', icon: LockClosedIcon, component: <Security /> },
  { name: 'Contraseña', icon: KeyIcon, component: <ChangePassword /> }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  // Estado del tab actual
  const [currentTab, setCurrentTab] = useState(0);

  // Función para cambiar el tab actual
  const handleTabClick = index => {
    setCurrentTab(index);
  };

  // Componente que se va a renderizar
  const content = subNavigation[currentTab].component;

  return (
    <DefaultLayout>
      <main className="relative mt-12">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item, index) => (
                    <a
                      key={item.name}
                      href="#"
                      className={classNames(
                        index === currentTab
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700'
                          : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                      )}
                      aria-current={index === currentTab ? 'page' : undefined}
                      onClick={() => handleTabClick(index)}
                    >
                      <item.icon
                        className={classNames(
                          index === currentTab
                            ? 'text-emerald-500 group-hover:text-emerald-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </aside>
              {/* Aqui se debe renderizar el componente */}
              <div className="p-4 lg:col-span-9">{content}</div>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
