// Archivo src\components\Profile\Tabs.js
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Achievements from './Achievements';
import Likes from './Likes';
import Lists from './Lists';

const tabs = [
  { name: 'Logros', value: 'achievements' },
  { name: 'Me gusta', value: 'likes' },
  { name: 'Listas', value: 'lists' },
  { name: 'Offer', value: 'offer' },
  { name: 'Hired', value: 'hired' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileTabs() {
  const router = useRouter();
  const currentTab = router.query.tab || tabs[0].value;

  const [activeTab, setActiveTab] = useState(currentTab);

  return (
    <div className="relative border-b border-gray-200 bg-white p-6 pb-5 mt-12 rounded-md sm:pb-0">
      <div className="mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            value={activeTab}
            onChange={e => {
              const value = e.target.value;
              setActiveTab(value);
            }}
          >
            {tabs.map(tab => (
              <option key={tab.value} value={tab.value}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <Tab.Group>
            <Tab.List className="-mb-px flex space-x-8">
              {tabs.map(tab => (
                <Tab
                  key={tab.value}
                  className={classNames(
                    activeTab === tab.value
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-7s00 hover:border-gray-300',
                    'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm focus:outline-none'
                  )}
                  onClick={() => {
                    setActiveTab(tab.value);
                  }}
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <Achievements />
              </Tab.Panel>
              <Tab.Panel>
                <Likes />
              </Tab.Panel>
              <Tab.Panel>
                <Lists />
              </Tab.Panel>
              <Tab.Panel>
                {/* Aquí va el componente para el tab Offer */}
                {/* <Offer /> */}
              </Tab.Panel>
              <Tab.Panel>
                {/* Aquí va el componente para el tab Hired */}
                {/* <Hired /> */}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
