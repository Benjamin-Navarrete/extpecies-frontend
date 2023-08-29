// Archivo src\components\Profile\Lists.js
import React from 'react';

// Asumo que tienes un objeto JSON con las listas y sus clientes, algo así:
const lists = [
  {
    title: 'Latest Customers',
    customers: [
      {
        name: 'Neil Sims',
        email: 'email@windster.com',
        image: '/docs/images/people/profile-picture-1.jpg',
        amount: 320
      },
      {
        name: 'Bonnie Green',
        email: 'email@windster.com',
        image: '/docs/images/people/profile-picture-3.jpg',
        amount: 3467
      }
      // ... otros clientes
    ]
  },
  {
    title: 'Best Customers',
    customers: [
      {
        name: 'Lana Byrd',
        email: 'email@windster.com',
        image: '/docs/images/people/profile-picture-4.jpg',
        amount: 367
      },
      {
        name: 'Thomes Lean',
        email: 'email@windster.com',
        image: '/docs/images/people/profile-picture-5.jpg',
        amount: 2367
      }
      // ... otros clientes
    ]
  },
  {
    title: 'New Customers',
    customers: [
      {
        name: 'Michael Gough',
        email: 'email@windster.com',
        image: '/docs/images/people/profile-picture-2.jpg',
        amount: 67
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
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          ${amount}
        </div>
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
          View all
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
  return (
    <div className="grid gap-3 mt-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {lists.map(list => (
        <List key={list.title} {...list} />
      ))}
    </div>
  );
};

// Exporto el componente Grid como el principal
export default Grid;
