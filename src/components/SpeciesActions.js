// src/components/SpeciesActions.js
import { Tooltip } from 'react-tooltip';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

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

import {
  HeartIcon as HeartIconSolid,
  XMarkIcon
} from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

const SpeciesActions = ({
  especie,
  usuario,
  added,
  setAdded,
  setIsListModalOpen
}) => {
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('Dar me gusta');
  const [tooltipContent2, setTooltipContent2] = useState('Añadir a lista');
  const [tooltipContent3, setTooltipContent3] = useState('Copiar enlace');

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

  const { mutate: toggleLike } = useMutation(
    liked =>
      liked
        ? darLike(usuario.id, especie.id)
        : quitarLike(usuario.id, especie.id),
    {
      onSuccess: data => {
        toast.success(
          `Se ${liked ? 'eliminó' : 'agregó'} el me gusta correctamente`
        );
      },
      onError: error => {
        toast.error('Ocurrió un error al dar me gusta');
      },
      onSettled: (data, error) => {
        queryClient.invalidateQueries(['likesCount', especie.id]);
      }
    }
  );

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
        {added ? (
          <XMarkIcon
            className="h-7 w-7 mx-auto text-red-500"
            data-tooltip-id="tooltip-id"
            data-tooltip-content={tooltipContent2}
            data-tooltip-place="top"
            onClick={() => {
              setAdded(!added);
              setTooltipContent2(added ? 'Quitar de lista' : 'Añadir a lista');
            }}
          />
        ) : (
          <DocumentPlusIcon
            className="h-7 w-7 mx-auto text-gray-900"
            data-tooltip-id="tooltip-id"
            data-tooltip-content={tooltipContent2}
            data-tooltip-place="top"
            onClick={() => {
              setIsListModalOpen(true);
              // setTooltipContent2(added ? 'Quitar de lista' : 'Añadir a lista');
            }}
          />
        )}
        <span className="text-gray-900">Añadir a lista</span>
      </div>
      <div className="px-6 py-5 text-center text-sm font-medium">
        <LinkIcon
          className={`h-7 w-7 mx-auto text-center text-sm font-medium ${
            !copied ? 'text-gray-900' : 'text-green-500'
          }`}
          data-tooltip-id="tooltip-id"
          data-tooltip-content={tooltipContent3}
          data-tooltip-place="top"
          onClick={() => {
            navigator.clipboard.writeText('https://www.example.com/post/123');
            setCopied(!copied);
            setTooltipContent3(copied ? 'Copiar enlace' : 'Copiado');
          }}
        />

        <span className="text-gray-900">Copiar enlace</span>
      </div>

      <Tooltip id="tooltip-id" />
    </div>
  );
};

export default SpeciesActions;
