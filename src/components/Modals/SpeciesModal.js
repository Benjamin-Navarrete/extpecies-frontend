// src/components/SpeciesModal.js
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Tooltip } from 'react-tooltip';
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

const announcements = [
  {
    id: 1,
    title: 'Comentario 1',
    href: '#',
    preview:
      'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.'
  },
  {
    id: 2,
    title: 'Comentario 2',
    href: '#',
    preview:
      'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.'
  },
  {
    id: 3,
    title: 'Comentario 3',
    href: '#',
    preview:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.'
  },
  {
    id: 4,
    title: 'Comentario 4',
    href: '#',
    preview:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.'
  },
  {
    id: 5,
    title: 'Comentario 5',
    href: '#',
    preview:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.'
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SpeciesModal = ({ isOpen, closeModal, especie = {} }) => {
  if (!especie) {
    especie = {};
  }

  const [selected, setSelected] = useState(moods[5]);

  // Usar la desestructuración de objetos para acceder a las propiedades del json
  // y asignar valores por defecto en caso de que no existan
  const {
    nombreComun = '',
    nombreCientifico = '',
    reino = '',
    familia = '',
    estadoConservacion = '',
    descripcionGeografica = '',
    detallesAmenazas = ''
  } = especie;

  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('Dar me gusta');
  const [tooltipContent2, setTooltipContent2] = useState('Añadir a lista');
  const [tooltipContent3, setTooltipContent3] = useState('Copiar enlace');

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[9999] overflow-y-auto"
        onClose={closeModal}
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
                              <HeartIconOutline
                                className="h-7 w-7 mx-auto text-gray-900"
                                data-tooltip-id="tooltip-id"
                                data-tooltip-content={tooltipContent}
                                data-tooltip-place="top"
                                onClick={() => {
                                  setLiked(!liked);
                                  setTooltipContent(
                                    liked ? 'Quitar me gusta' : 'Dar me gusta'
                                  );
                                }}
                              />
                            ) : (
                              <HeartIcon
                                className="h-7 w-7 mx-auto text-red-500"
                                data-tooltip-id="tooltip-id"
                                data-tooltip-content={tooltipContent}
                                data-tooltip-place="top"
                                onClick={() => {
                                  setLiked(!liked);
                                  setTooltipContent(
                                    liked ? 'Quitar me gusta' : 'Dar me gusta'
                                  );
                                }}
                              />
                            )}
                            <span className="text-gray-900">12 Me gusta</span>
                          </div>
                          <div className="px-6 py-5 text-center text-sm font-medium">
                            {added ? (
                              <DocumentPlusIcon
                                className="h-7 w-7 mx-auto text-gray-900"
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
                            <form action="#">
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
                                  defaultValue={''}
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
                              Comentarios (5)
                            </h2>
                            <div className="mt-6 flow-root">
                              <ul
                                role="list"
                                className="-my-5 divide-y divide-gray-200"
                              >
                                {announcements.map(announcement => (
                                  <li key={announcement.id} className="py-5">
                                    <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                      <h3 className="text-sm font-semibold text-gray-800">
                                        <a
                                          href={announcement.href}
                                          className="hover:underline focus:outline-none"
                                        >
                                          {/* Extend touch target to entire panel */}
                                          <span
                                            className="absolute inset-0"
                                            aria-hidden="true"
                                          />
                                          {announcement.title}
                                        </a>
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                        {announcement.preview}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-6">
                              <a
                                href="#"
                                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                              >
                                Ver todos los comentarios
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Agregar un botón para cerrar el modal en la parte de abajo a la derecha */}
                    {/* Usar un div con flex y justify-end para alinear el botón */}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={closeModal}
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
      </Dialog>
    </Transition>
  );
};

export default SpeciesModal;
