// Archivo src\components\Profile\Tabs.js
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

const tabs = [
  { name: 'Logros', icon: TrophyIcon, value: 'logros' },
  { name: 'Me gusta', icon: HeartIcon, value: 'me-gusta' },
  { name: 'Listas', icon: ListBulletIcon, value: 'listas' },
  { name: 'Configuración', icon: CogIcon, value: 'configuracion' }
  // { name: 'Estadísticas', icon: ChartBarSquareIcon, value: 'estadisticas' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Recibir el prop tab desde el archivo [tab].js los valores son
export default function Tabs(props) {
  const [content, setContent] = useState(null);
  // Crear una instancia del componente Router
  const router = useRouter();

  // Se extraen los datos del usuario con useQuery para utilizar en el menú
  const { data: usuario } = useQuery('usuario');

  useEffect(() => {
    // Usar el prop tab en lugar del estado currentTab
    switch (props.tab) {
      case 'logros':
        setContent(<Achievements usuario={usuario} />);
        break;
      case 'me-gusta':
        setContent(<Likes usuario={usuario} />);
        break;
      case 'listas':
        setContent(<Lists usuario={usuario} />);
        break;
      case 'configuracion':
        setContent(<Configuracion usuario={usuario} />);
        break;
      default:
        setContent(null);
    }
  }, [props.tab]);

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
          defaultValue={props.tab}
          onChange={e => {
            const href = `/profile/${e.target.value}`;
            router.push(href);
          }}
        >
          {tabs.map(tab => (
            <option key={tab.name} value={tab.value}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map(tab => (
              <Link key={tab.name} href={`/profile/${tab.value}`}>
                <div
                  className={classNames(
                    tab.value === props.tab
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.value === props.tab ? 'page' : undefined}
                >
                  <tab.icon
                    className={classNames(
                      tab.value === props.tab
                        ? 'text-emerald-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="p-4">{content}</div>
    </div>
  );
}
