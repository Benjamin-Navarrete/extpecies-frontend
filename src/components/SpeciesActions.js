// src/components/SpeciesActions.js
import { Tooltip } from 'react-tooltip';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import AddSpecieModal from './Modals/AddSpecieModal';

import {
  darLike,
  getLikeByUserAndEspecie,
  getLikesCountByEspecie,
  quitarLike
} from '@/api/likeApi';

import {
  HeartIcon as HeartIconOutline,
  DocumentPlusIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Logro from './Logro';

const SpeciesActions = ({ especie, usuario }) => {
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('Dar me gusta');
  const [tooltipContent3, setTooltipContent3] = useState('Copiar enlace');
  const [modalOpen, setModalOpen] = useState(false);

  const { data: likesCount } = useQuery(
    ['likesCount', especie.id],
    () => getLikesCountByEspecie(especie.id),
    {
      enabled: !!especie.id
    }
  );

  const { data: userLikes } = useQuery(
    ['userLikes', usuario?.id, especie.id],
    () => getLikeByUserAndEspecie(usuario?.id, especie.id),
    {
      enabled: !!(usuario && especie.id),
      retry: 1,
      onError: error => {
        if (error.response.status === 404) {
          setLiked(false);
        }
      },
      initialData: null
    }
  );

  useEffect(() => {
    const hasLiked = !!userLikes;
    setLiked(hasLiked);
  }, [userLikes]);

  const { mutate: toggleLike, data: likeData } = useMutation(
    liked =>
      liked
        ? darLike(usuario.id, especie.id)
        : quitarLike(usuario.id, especie.id),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('likes');
        toast.success(
          `Se ${liked ? 'eliminó' : 'agregó'} el me gusta correctamente`
        );
        if (data.logro) {
          queryClient.invalidateQueries(['achievements', usuario?.id]);
        }
      },
      onError: () => {
        toast.error('Ocurrió un error al dar me gusta');
      },
      onSettled: () => {
        queryClient.invalidateQueries(['likesCount', especie.id]);
      }
    }
  );

  // Creo una función para abrir el modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Creo una función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 divide-y divide-gray-200 mt-1 border-separate border-gray-200 rounded-lg bg-white shadow sm:grid sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
      <div className="px-6 py-5 text-center text-sm font-medium ">
        {liked ? (
          <HeartIconSolid
            className="h-7 w-7 mx-auto text-red-500"
            data-tooltip-id="tooltip-id"
            data-tooltip-content={tooltipContent}
            data-tooltip-place="top"
            onClick={() => {
              if (usuario) {
                const newLiked = !liked;
                setLiked(newLiked);
                setTooltipContent(
                  newLiked ? 'Quitar me gusta' : 'Dar me gusta'
                );
                toggleLike(newLiked);
              } else {
                toast.error('Debes iniciar sesión para dar me gusta');
              }
            }}
          />
        ) : (
          <HeartIconOutline
            className="h-7 w-7 mx-auto text-gray-900"
            data-tooltip-id="tooltip-id"
            data-tooltip-content={tooltipContent}
            data-tooltip-place="top"
            onClick={() => {
              if (usuario) {
                const newLiked = !liked;
                setLiked(newLiked);
                setTooltipContent(
                  newLiked ? 'Quitar me gusta' : 'Dar me gusta'
                );
                toggleLike(newLiked);
              } else {
                toast.error('Debes iniciar sesión para dar me gusta');
              }
            }}
          />
        )}
        <span className="text-gray-900">{likesCount} Me gusta</span>
      </div>
      <div className="px-6 py-5 text-center text-sm font-medium">
        <DocumentPlusIcon
          className="h-7 w-7 mx-auto text-gray-900"
          data-tooltip-id="tooltip-id"
          data-tooltip-content={'Añadir a lista'}
          data-tooltip-place="top"
          onClick={() => {
            if (usuario) {
              openModal();
            } else {
              toast.error('Debes iniciar sesión para añadir a lista');
            }
          }}
        />
        <span className="text-gray-900">Añadir a lista</span>
      </div>
      <div className="px-6 py-5 text-center text-sm font-medium">
        <LinkIcon
          className={`h-7 w-7 mx-auto text-center text-sm font-medium ${
            !copied ? 'text-gray-900' : 'text-emerald-500'
          }`}
          data-tooltip-id="tooltip-id"
          data-tooltip-content={tooltipContent3}
          data-tooltip-place="top"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(!copied);
            setTooltipContent3(copied ? 'Copiar enlace' : 'Copiado');
          }}
        />

        <span className="text-gray-900">Copiar enlace</span>
      </div>

      <AddSpecieModal
        isOpen={modalOpen}
        onClose={closeModal}
        usuario={usuario}
        especie={especie}
      />

      <Tooltip id="tooltip-id" />

      {likeData && likeData.logro && <Logro logro={likeData?.logro} />}
    </div>
  );
};

export default SpeciesActions;
