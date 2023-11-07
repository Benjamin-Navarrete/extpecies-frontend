// Archivo src\components\Profile\EspecieRow.js
import React from 'react';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from 'react-query';
import { deleteSpecieFromList } from '@/api/listaApi';
import { toast } from 'react-toastify';

// Creo un componente para mostrar cada especie
const Especie = props => {
  const queryClient = useQueryClient();

  // Creo una mutación con react query para eliminar la especie de la lista
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    () => deleteSpecieFromList(props.listaId, props.id), // Paso el id de la lista y de la especie al método deleteSpecieFromList
    {
      onSuccess: data => {
        queryClient.invalidateQueries('listas');
        // Si la mutación tiene éxito, muestro un mensaje de éxito
        toast.success('La especie se ha eliminado de la lista');
      },
      onError: error => {
        // Si la mutación tiene error, muestro un mensaje de error
        toast.error(error.message);
      }
    }
  );

  const handleDelete = () => {
    mutate();
  };

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
          <TrashIcon
            className="h-5 w-5 ml-2 cursor-pointer"
            data-tooltip-id="tooltip-eliminar"
            data-tooltip-content="Eliminar especie de la lista"
            data-tooltip-place="top"
            onClick={handleDelete}
          />
          <Tooltip id="tooltip-eliminar" />
        </div>
      </div>
    </li>
  );
};

// Exporto el componente Especie
export default Especie;
