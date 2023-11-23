// Archivo src/components/Profile/Tabs.js
import React, { useState, useEffect } from 'react';
import {
  TrophyIcon,
  HeartIcon,
  ListBulletIcon,
  CogIcon
} from '@heroicons/react/20/solid';
import Achievements from './Achievements';
import Likes from './Likes';
import Lists from './Listas/Lists';
import Link from 'next/link';
import Configuracion from './Configuracion';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import classNames from 'classnames';

const tabs = [
  { name: 'Logros', icon: TrophyIcon, value: 'logros' },
  { name: 'Me gusta', icon: HeartIcon, value: 'me-gusta' },
  { name: 'Listas', icon: ListBulletIcon, value: 'listas' },
  { name: 'Configuración', icon: CogIcon, value: 'configuracion' }
  // { name: 'Estadísticas', icon: ChartBarSquareIcon, value: 'estadisticas' }
];

// Recibir el prop tab y el prop isOwner desde el archivo [tab].js
export default function Tabs({ tab, isOwner, usuario }) {
  const [content, setContent] = useState(null);
  // Crear una instancia del componente Router
  const router = useRouter();
  const tabName = tab;

  useEffect(() => {
    // Usar el prop tab en lugar del estado currentTab
    switch (tab) {
      case 'logros':
        setContent(<Achievements usuario={usuario} />);
        break;
      case 'me-gusta':
        setContent(<Likes usuario={usuario} />);
        break;
      case 'listas':
        // Pasar el prop isOwner al componente Lists
        setContent(<Lists usuario={usuario} isOwner={isOwner} />);
        break;
      case 'configuracion':
        setContent(<Configuracion usuario={usuario} />);
        break;
      default:
        setContent(null);
    }
  }, [tab]);

  return (
    <div className="mt-5">
      <div className="sm:hidden p-4">
        <h3 className="text-lg py-3 leading-6 font-medium text-gray-900">
          Seleccione una pestaña
        </h3>
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
          defaultValue={tab}
          onChange={e => {
            const href = `/profile/${usuario.username}/${e.target.value}`;
            router.push(href);
          }}
        >
          {tabs.map(tab =>
            // Si el prop isOwner es falso, no mostrar la opción de configuración
            isOwner || tab.value !== 'configuracion' ? (
              <option key={tab.name} value={tab.value}>
                {tab.name}
              </option>
            ) : null
          )}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map(tab =>
              // Si el prop isOwner es falso, no mostrar el link de configuración
              isOwner || tab.value !== 'configuracion' ? (
                <Link
                  key={tab.name}
                  href={`/profile/${usuario?.username}/${tab.value}`}
                >
                  <div
                    className={classNames(
                      tab.value === tabName
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                    )}
                    aria-current={tab.value === tabName ? 'page' : undefined}
                  >
                    <tab.icon
                      className={classNames(
                        tab.value === tabName
                          ? 'text-emerald-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        '-ml-0.5 mr-2 h-5 w-5'
                      )}
                      aria-hidden="true"
                    />
                    <span>{tab.name}</span>
                  </div>
                </Link>
              ) : null
            )}
          </nav>
        </div>
      </div>
      <div className="p-4">{content}</div>
    </div>
  );
}
