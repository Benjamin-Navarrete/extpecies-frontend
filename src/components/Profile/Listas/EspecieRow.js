// Archivo src\components\Profile\EspecieRow.js
import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';

// Creo un componente para mostrar cada especie
const Especie = props => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={props.imagen}
            alt={props.nombreComun + ' image'}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate ">
            {props.nombreComun}
          </p>
          <p className="text-sm text-gray-500 truncate ">
            {props.estadoConservacion}
          </p>
        </div>

        <div className="inline-flex items-center text-base font-semibold text-gray-600">
          <EyeIcon
            className="h-5 w-5"
            data-tooltip-id="tooltip-ver"
            data-tooltip-content="Ver especie"
            data-tooltip-place="top"
          />
          <Tooltip id="tooltip-ver" />
        </div>
      </div>
    </li>
  );
};

// Exporto el componente Especie
export default Especie;
