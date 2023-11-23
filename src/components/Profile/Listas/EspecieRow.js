// Archivo src\components\Profile\EspecieRow.js
import React from 'react';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from 'react-query';
import { deleteSpecieFromList } from '@/api/listaApi';
import { toast } from 'react-toastify';

// Creo un componente para mostrar cada especie
// Agrego una nueva prop llamada openModal
const Especie = ({ especie, openModal, listaId, isOwner }) => {
  const queryClient = useQueryClient();

  // Creo una mutación con react query para eliminar la especie de la lista
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    () => deleteSpecieFromList(listaId, especie.id), // Paso el id de la lista y de la especie al método deleteSpecieFromList
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
            className="h-16 w-16 rounded-full"
            src={especie.imagen}
            alt={especie.nombreComun}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {especie.nombreComun}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {especie.nombreCientifico}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-600">
          {/* Le paso la prop openModal al icono de ojo y le agrego un evento onClick */}
          <EyeIcon
            className="h-5 w-5 cursor-pointer"
            data-tooltip-id="tooltip-ver"
            data-tooltip-content="Ver especie"
            data-tooltip-place="top"
            onClick={() => openModal(especie)}
          />
          <Tooltip id="tooltip-ver" />
          {isOwner && (
            <TrashIcon
              className="h-5 w-5 ml-2 cursor-pointer"
              data-tooltip-id="tooltip-eliminar"
              data-tooltip-content="Eliminar"
              data-tooltip-place="top"
              onClick={handleDelete}
            />
          )}

          <Tooltip id="tooltip-eliminar" />
        </div>
      </div>
    </li>
  );
};

// Exporto el componente Especie
export default Especie;
