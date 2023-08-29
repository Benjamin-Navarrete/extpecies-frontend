// Archivo src\components\Profile\Tabs.js
import React, { useState, useEffect } from 'react';
import {
  TrophyIcon,
  HeartIcon,
  ListBulletIcon,
  ChartBarSquareIcon
} from '@heroicons/react/20/solid';
import Achievements from './Achievements';
import Likes from './Likes';
import Lists from './Lists';

const tabs = [
  { name: 'Logros', icon: TrophyIcon },
  { name: 'Me gusta', icon: HeartIcon },
  { name: 'Listas', icon: ListBulletIcon },
  { name: 'Estadísticas', icon: ChartBarSquareIcon }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [currentTab, setCurrentTab] = useState(0);
  const [content, setContent] = useState(null);

  useEffect(() => {
    switch (currentTab) {
      case 0:
        setContent(<Achievements />);
        break;
      case 1:
        setContent(<Likes />);
        break;
      case 2:
        setContent(<Lists />);
        break;
      default:
        setContent(null);
    }
  }, [currentTab]);

  return (
    <div className="mt-5">
      <div className="sm:hidden p-4 ">
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
          defaultValue={tabs[currentTab].name}
          onChange={e => {
            const index = tabs.findIndex(tab => tab.name === e.target.value);
            setCurrentTab(index);
          }}
        >
          {tabs.map(tab => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <a
                key={tab.name}
                className={classNames(
                  index === currentTab
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={index === currentTab ? 'page' : undefined}
                onClick={e => {
                  e.preventDefault();
                  setCurrentTab(index);
                }}
              >
                <tab.icon
                  className={classNames(
                    index === currentTab
                      ? 'text-emerald-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="p-4">{content}</div>
    </div>
  );
}
