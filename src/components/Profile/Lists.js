// Archivo src\components\Profile\Lists.js
import React from 'react';
import AddListButton from './AddListButton';

// Asumo que tienes un objeto JSON con las listas y sus clientes, algo así:
const lists = [
  {
    title: 'Lista 1',
    customers: [
      {
        name: 'Especie 1',
        email: 'Descripción de la especie 1',
        image: 'https://placehold.co/50x50',
        amount: 320
      },
      {
        name: 'Especie 2',
        email: 'Descripción de la especie 2',
        image: 'https://placehold.co/50x50',
        amount: 320
      }
      // ... otros clientes
    ]
  },
  {
    title: 'Lista 2',
    customers: [
      {
        name: 'Especie 1',
        email: 'Descripción de la especie 1',
        image: 'https://placehold.co/50x50',
        amount: 320
      },
      {
        name: 'Especie 2',
        email: 'Descripción de la especie 2',
        image: 'https://placehold.co/50x50',
        amount: 320
      }
      // ... otros clientes
    ]
  },
  {
    title: 'Lista 3',
    customers: [
      {
        name: 'Especie 1',
        email: 'Descripción de la especie 1',
        image: 'https://placehold.co/50x50',
        amount: 320
      }
      // ... otros clientes
    ]
  }
];

// Creo un componente para mostrar cada cliente
const Customer = ({ name, email, image, amount }) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={image}
            alt={name + ' image'}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate ">{name}</p>
          <p className="text-sm text-gray-500 truncate ">{email}</p>
        </div>
        {/* <div className="inline-flex items-center text-base font-semibold text-gray-900">
          ${amount}
        </div> */}
      </div>
    </li>
  );
};

// Creo un componente para mostrar cada lista
const List = ({ title, customers }) => {
  return (
    <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow  sm:p-8 md:flex-grow md:flex-shrink">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 ">
          {title}
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-emerald-600 hover:underline "
        >
          Ver completa
        </a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 ">
          {customers.map(customer => (
            <Customer key={customer.name} {...customer} />
          ))}
        </ul>
      </div>
    </div>
  );
};

// Creo un componente para mostrar todas las listas en una grilla responsiva
const Grid = () => {
  // Renderizo los componentes Grid y AddListButton debajo de él
  return (
    <div className="grid gap-3 mt-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {lists.map(list => (
        <List key={list.title} {...list} />
      ))}
      <AddListButton />
    </div>
  );
};

// Exporto el componente Grid como el principal
export default Grid;
