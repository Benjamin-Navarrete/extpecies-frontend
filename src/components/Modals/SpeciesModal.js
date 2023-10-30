// src/components/SpeciesModal.js
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import ListModal from './ListModal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import Comment from '../Comentario';

import {
  createComment,
  deleteComment,
  getCommentsByEspecie,
  updateComment
} from '@/api/commentApi';

import {
  darLike,
  getLikeByUserAndEspecie,
  getLikesCountByEspecie,
  quitarLike
} from '@/api/likeApi';

import {
  FaceSmileIcon as FaceSmileIconOutline,
  PaperClipIcon,
  HeartIcon as HeartIconOutline,
  DocumentPlusIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon
} from '@heroicons/react/20/solid';

const moods = [
  {
    name: 'Excited',
    value: 'excited',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500'
  },
  {
    name: 'Loved',
    value: 'loved',
    icon: HeartIcon,
    iconColor: 'text-white',
    bgColor: 'bg-pink-400'
  },
  {
    name: 'Happy',
    value: 'happy',
    icon: FaceSmileIconMini,
    iconColor: 'text-white',
    bgColor: 'bg-green-400'
  },
  {
    name: 'Sad',
    value: 'sad',
    icon: FaceFrownIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-400'
  },
  {
    name: 'Thumbsy',
    value: 'thumbsy',
    icon: HandThumbUpIcon,
    iconColor: 'text-white',
    bgColor: 'bg-blue-500'
  },
  {
    name: 'I feel nothing',
    value: null,
    icon: XMarkIcon,
    iconColor: 'text-gray-400',
    bgColor: 'bg-transparent'
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SpeciesModal = ({ isOpen, closeModal, especie = {} }) => {
  const {
    // nombreComun = '',
    // nombreCientifico = '',
    reino = '',
    familia = '',
    estadoConservacion = '',
    descripcionGeografica = '',
    detallesAmenazas = ''
  } = especie;

  const queryClient = useQueryClient();

  // Este estado controla si el modal de crear lista está abierto o cerrado
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selected, setSelected] = useState(moods[5]);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('Dar me gusta');
  const [tooltipContent2, setTooltipContent2] = useState('Añadir a lista');
  const [tooltipContent3, setTooltipContent3] = useState('Copiar enlace');
  // Estado para el contenido del nuevo comentario
  const [content, setContent] = useState('');
  // Estado para la paginación de los comentarios
  const [page, setPage] = useState(1);

  // Estado para la paginación de los comentarios
  // Lo cambio a un objeto con dos propiedades: value y prevValue
  const [limit, setLimit] = useState({ value: 5, prevValue: 5 });

  // Efecto que se ejecute cuando se abre o se cierra el modal
  useEffect(() => {
    if (isOpen) {
      // Guardo el valor actual del límite en prevValue
      setLimit(limit => ({ ...limit, prevValue: limit.value }));
      // Reseteo el valor del límite a 5
      setLimit(limit => ({ ...limit, value: 5 }));
    } else {
      // Restauro el valor previo del límite
      setLimit(limit => ({ ...limit, value: limit.prevValue }));
    }
  }, [isOpen]);

  const { data: usuario } = useQuery('usuario');

  // Mutaciones de comentarios
  // Query para obtener los comentarios de la especie seleccionada
  const { data: comments, isLoading: isLoadingComments } = useQuery(
    ['comments', especie.id, page, limit.value], // Uso limit.value como parámetro
    () => getCommentsByEspecie(especie.id, page, limit.value), // Uso limit.value como argumento
    {
      enabled: !!especie.id // Solo ejecuto la query si hay una especie seleccionada
    }
  );

  // Mutación para crear un nuevo comentario
  const createCommentMutation = useMutation(createComment, {
    onSuccess: data => {
      // Invalido la cache de los comentarios en vez de usar setQueryData
      queryClient.invalidateQueries(['comments', especie.id]);
      // Limpio el contenido del comentario
      setContent('');
      // Muestro un mensaje de éxito
      toast.success('Comentario agregado');
    },
    onError: error => {
      // Muestro un mensaje de error
      toast.error(error.response.data.message);
    }
  });

  const {
    data: likesCount
    // isLoading,
    // error
  } = useQuery(
    ['likesCount', especie.id],
    // El segundo argumento es una función que devuelve una promesa con los datos
    () => getLikesCountByEspecie(especie.id),
    // El tercer argumento son opciones para configurar la query
    {
      // Esta opción habilita o deshabilita la query según una condición
      enabled: !!(isOpen && especie.id)
      // La query solo se ejecutará si el modal está abierto y la especie tiene un id válido
    }
  );
  // Se pueden usar las variables isLoading y error para mostrar un indicador de carga o un mensaje de error si ocurre

  const { data: userLikes } = useQuery(
    ['userLikes', usuario?.id, especie.id],
    () => getLikeByUserAndEspecie(usuario?.id, especie.id),
    {
      enabled: !!(isOpen && usuario && especie.id),
      // Esta opción configura cuántas veces se intentará reintentar una query si falla
      retry: 1,
      onError: error => {
        if (error.response.status === 404) {
          setLiked(false);
        }
      },
      // Esta opción proporciona un valor inicial para la query mientras se resuelve
      initialData: null
    }
  );

  // Hook para ejecutar una función cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      // Verificar si el usuario ya le ha dado like a la especie
      // La variable userLikes es un objeto con el like del usuario por el id de la especie
      // Si el objeto es null, significa que no hay ningún like
      // Si el objeto existe, significa que hay un like
      const hasLiked = !!userLikes;

      // Actualizar la variable de estado con el resultado de la verificación
      setLiked(hasLiked);
    }
  }, [isOpen, userLikes]); // El hook se ejecuta solo cuando cambia el valor de isOpen o de userLikes

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
      // Esta opción se ejecuta después de onSuccess o onError
      onSettled: (data, error) => {
        // Invalidar la caché de la query para refetchear los datos actualizados
        queryClient.invalidateQueries(['likesCount', especie.id]);
      }
    }
  );

  // Este efecto cierra el modal de crear lista cuando se cierra el modal de especie
  useEffect(() => {
    if (!isOpen) {
      setIsListModalOpen(false);
    }
  }, [isOpen]);

  // Esta función se pasa como prop al componente ListModal.js y se ejecuta cuando se cambia el valor del listbox
  // Esta función recibe el id de la lista seleccionada como argumento
  // y actualiza el estado del modal de especie con la lista seleccionada
  const handleListSelected = listId => {
    // Aquí debes agregar la lógica para agregar la especie a la lista usando la API
    // Por ahora solo voy a mostrar un mensaje de éxito y cerrar el modal de crear lista
    toast.success(`Se agregó la especie a la lista ${listId} correctamente`);
    setIsListModalOpen(false);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[9998] overflow-y-auto"
        onClose={() => {
          closeModal();
          setLiked(false);
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />

          {/* Usar un div con flex y justify-center para centrar el contenido */}
          <div className="flex justify-center items-center h-screen">
            {/* Agregar un margen superior e inferior de 8 al modal para que no ocupe toda la pantalla */}
            <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="min-h-full  mt-4 max-h-[80vh] overflow-y-auto">
                  <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="sr-only">Profile</h1>
                    {/* Main 3 column grid */}
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                      {/* Left column */}
                      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                        {/* Welcome panel */}
                        <div className="overflow-hidden mt-1 rounded-lg bg-white shadow">
                          <h2 className="sr-only" id="profile-overview-title">
                            Profile Overview
                          </h2>
                          <div className="bg-white p-6">
                            <div className="sm:flex sm:items-center sm:justify-between">
                              <div className="sm:flex sm:space-x-5">
                                <div className="flex-shrink-0">
                                  <img
                                    className="mx-auto h-20 w-20 rounded-full"
                                    src={especie.imagen}
                                    alt=""
                                  />
                                </div>
                                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                  <p className="text-sm font-medium text-gray-600">
                                    {especie.estadoConservacion}
                                  </p>
                                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {especie.nombreComun}
                                  </p>
                                  <p className="text-sm font-medium text-gray-600">
                                    {especie.nombreCientifico}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="mt-5 flex justify-center sm:mt-0">
                                <a
                                  href="#"
                                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                  View profile
                                </a>
                              </div> */}
                            </div>
                          </div>
                        </div>

                        {/* Actions panel */}
                        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0">
                          <h2 className="sr-only" id="quick-links-title">
                            Quick links
                          </h2>
                          {/* Usar una condición para renderizar el contenido solo si especie es verdadero */}
                          {especie && (
                            // Agregar un alto máximo de 80vh y un overflow-y auto al div que contiene el contenido del modal
                            // Así se podrá hacer scroll dentro del modal si el contenido es muy largo
                            <div>
                              <img
                                className="h-auto w-screen mb-4 rounded-lg"
                                src={especie.imagen}
                                alt={especie.nombreComun}
                              />
                              {/* Usar una lista para mostrar los datos relevantes y darles más espacio */}
                              {/* Usar secciones con título y una línea gris divisoria para cada dato */}
                              <ul className="list-none list-inside ml-4">
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Reino
                                  </h2>
                                  <p className="text-gray-600">{reino}</p>
                                  <hr className="my-2 border-gray-300" />
                                </li>
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Familia
                                  </h2>
                                  <p className="text-gray-600">{familia}</p>
                                  <hr className="my-2 border-gray-300" />
                                </li>
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Estado de conservación
                                  </h2>
                                  <p className="text-gray-600">
                                    {estadoConservacion}
                                  </p>
                                  <hr className="my-2 border-gray-300" />
                                </li>
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Descripción geográfica
                                  </h2>
                                  <p className="text-gray-600">
                                    {descripcionGeografica}
                                  </p>
                                  <hr className="my-2 border-gray-300" />
                                </li>
                                <li>
                                  <h2 className="text-lg font-semibold text-gray-800">
                                    Amenazas
                                  </h2>
                                  <p className="text-gray-600">
                                    {detallesAmenazas}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right column */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 divide-y divide-gray-200 mt-1 border-separate border-gray-200 rounded-lg bg-white shadow sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                          {/* Opciones arriba de los comentarios */}
                          <div className="px-6 py-5 text-center text-sm font-medium ">
                            {liked ? (
                              <HeartIcon
                                className="h-7 w-7 mx-auto text-red-500"
                                data-tooltip-id="tooltip-id"
                                data-tooltip-content={tooltipContent}
                                data-tooltip-place="top"
                                onClick={() => {
                                  if (usuario) {
                                    // Invertir el valor de liked
                                    const newLiked = !liked;
                                    setLiked(newLiked);

                                    // Cambiar el contenido del tooltip según el nuevo valor de liked
                                    setTooltipContent(
                                      newLiked
                                        ? 'Quitar me gusta'
                                        : 'Dar me gusta'
                                    );

                                    // Llamar a la función toggleLike pasándole el nuevo valor de liked
                                    toggleLike(newLiked);
                                  } else {
                                    toast.error(
                                      'Debes iniciar sesión para dar me gusta'
                                    );
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
                                    // Invertir el valor de liked
                                    const newLiked = !liked;
                                    setLiked(newLiked);

                                    // Cambiar el contenido del tooltip según el nuevo valor de liked
                                    setTooltipContent(
                                      newLiked
                                        ? 'Quitar me gusta'
                                        : 'Dar me gusta'
                                    );

                                    // Llamar a la función toggleLike pasándole el nuevo valor de liked
                                    toggleLike(newLiked);
                                  } else {
                                    toast.error(
                                      'Debes iniciar sesión para dar me gusta'
                                    );
                                  }
                                }}
                              />
                            )}
                            <span className="text-gray-900">
                              {likesCount} Me gusta
                            </span>
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
                                  setTooltipContent2(
                                    added ? 'Quitar de lista' : 'Añadir a lista'
                                  );
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
                            <span className="text-gray-900">
                              Añadir a lista
                            </span>
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
                                // Aquí puedes usar alguna función para copiar el enlace al portapapeles
                                // Por ejemplo, puedes usar la API de Clipboard que puedes leer aquí: https://developer.mozilla.org/es/docs/Web/API/Clipboard_API
                                navigator.clipboard.writeText(
                                  'https://www.example.com/post/123'
                                );
                                setCopied(!copied);
                                setTooltipContent3(
                                  copied ? 'Copiar enlace' : 'Copiado'
                                );
                              }}
                            />

                            <span className="text-gray-900">Copiar enlace</span>
                          </div>

                          <Tooltip id="tooltip-id" />
                        </div>
                        {/* Escribir comentario */}
                        <div className="flex items-start space-x-4 p-2 rounded-lg bg-white shadow">
                          <div className="min-w-full flex-1 pt-2">
                            <form
                              onSubmit={e => {
                                e.preventDefault();
                                if (usuario) {
                                  if (content) {
                                    createCommentMutation.mutate({
                                      content,
                                      id_usuario: usuario.id,
                                      id_especie: especie.id
                                    });
                                  }
                                } else {
                                  toast.error(
                                    'Debes iniciar sesión para comentar'
                                  );
                                }
                              }}
                            >
                              <div className="border-b border-gray-200 focus-within:border-emerald-600">
                                <label htmlFor="comment" className="sr-only">
                                  Escribir comentario
                                </label>
                                <textarea
                                  rows={4}
                                  name="comment"
                                  id="comment"
                                  className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-emerald-600 focus:ring-0 sm:text-sm"
                                  placeholder="Escribir comentario..."
                                  value={content}
                                  onChange={e => setContent(e.target.value)}
                                />
                              </div>
                              <div className="flex justify-between pt-2">
                                <div className="flex items-center space-x-5">
                                  <div className="flow-root">
                                    <button
                                      type="button"
                                      className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                                    >
                                      <PaperClipIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <span className="sr-only">
                                        Attach a file
                                      </span>
                                    </button>
                                  </div>
                                  <div className="flow-root">
                                    <Listbox
                                      value={selected}
                                      onChange={setSelected}
                                    >
                                      {({ open }) => (
                                        <>
                                          <Listbox.Label className="sr-only">
                                            {' '}
                                            Your mood{' '}
                                          </Listbox.Label>
                                          <div className="relative">
                                            <Listbox.Button className="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                              <span className="flex items-center justify-center">
                                                {selected.value === null ? (
                                                  <span>
                                                    <FaceSmileIconOutline
                                                      className="h-6 w-6 flex-shrink-0"
                                                      aria-hidden="true"
                                                    />
                                                    <span className="sr-only">
                                                      {' '}
                                                      Add your mood{' '}
                                                    </span>
                                                  </span>
                                                ) : (
                                                  <span>
                                                    <span
                                                      className={classNames(
                                                        selected.bgColor,
                                                        'flex h-8 w-8 items-center justify-center rounded-full'
                                                      )}
                                                    >
                                                      <selected.icon
                                                        className="h-5 w-5 flex-shrink-0 text-white"
                                                        aria-hidden="true"
                                                      />
                                                    </span>
                                                    <span className="sr-only">
                                                      {selected.name}
                                                    </span>
                                                  </span>
                                                )}
                                              </span>
                                            </Listbox.Button>

                                            <Transition
                                              show={open}
                                              as={Fragment}
                                              leave="transition ease-in duration-100"
                                              leaveFrom="opacity-100"
                                              leaveTo="opacity-0"
                                            >
                                              <Listbox.Options className="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                                {moods.map(mood => (
                                                  <Listbox.Option
                                                    key={mood.value}
                                                    className={({ active }) =>
                                                      classNames(
                                                        active
                                                          ? 'bg-gray-100'
                                                          : 'bg-white',
                                                        'relative cursor-default select-none py-2 px-3'
                                                      )
                                                    }
                                                    value={mood}
                                                  >
                                                    <div className="flex items-center">
                                                      <div
                                                        className={classNames(
                                                          mood.bgColor,
                                                          'w-8 h-8 rounded-full flex items-center justify-center'
                                                        )}
                                                      >
                                                        <mood.icon
                                                          className={classNames(
                                                            mood.iconColor,
                                                            'flex-shrink-0 h-5 w-5'
                                                          )}
                                                          aria-hidden="true"
                                                        />
                                                      </div>
                                                      <span className="ml-3 block truncate font-medium">
                                                        {mood.name}
                                                      </span>
                                                    </div>
                                                  </Listbox.Option>
                                                ))}
                                              </Listbox.Options>
                                            </Transition>
                                          </div>
                                        </>
                                      )}
                                    </Listbox>
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                  >
                                    Comentar
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* Comentarios */}
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                          <div className="p-3">
                            <h2
                              className="text-base font-medium text-gray-900"
                              id="announcements-title"
                            >
                              Comentarios ({comments?.count || 0})
                            </h2>
                            <div className="mt-6 flow-root">
                              <ul
                                role="list"
                                className="-my-5 divide-y divide-gray-200"
                              >
                                {/* Muestro los comentarios usando el componente Comment */}
                                {comments?.rows.map(comment => (
                                  <Comment
                                    key={comment.id}
                                    comentario={comment}
                                  />
                                ))}
                              </ul>
                            </div>
                            <div className="mt-6">
                              {/* Muestro un botón para mostrar más comentarios si hay más de 5 */}
                              {comments?.count > limit.value && ( // Uso limit.value como condición
                                <button
                                  onClick={() => {
                                    // Incremento el valor del límite en 5
                                    setLimit(limit => ({
                                      ...limit,
                                      value: limit.value + 5
                                    }));
                                  }}
                                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 mt-4"
                                >
                                  Ver todos los comentarios
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Agregar un botón para cerrar el modal en la parte de abajo a la derecha */}
                    {/* Usar un div con flex y justify-end para alinear el botón */}
                    <div className="flex justify-end mt-4">
                      <button
                        onClose={() => {
                          closeModal();
                          setLiked(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ListModal
          isOpen={isListModalOpen}
          closeModal={() => setIsListModalOpen(false)}
          especie={especie}
          onListSelected={handleListSelected}
        />
      </Dialog>
    </Transition>
  );
};

export default SpeciesModal;
