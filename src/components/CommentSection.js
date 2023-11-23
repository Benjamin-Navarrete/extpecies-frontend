// src/components/CommentSection.js
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import Comment from './Comentario';
import { createComment, getCommentsByEspecie } from '@/api/commentApi';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Logro from './Logro';
// import Spinner from './Spinner';

const CommentSection = ({ especie, usuario, isOpen }) => {
  const queryClient = useQueryClient();

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
  const { mutate: createCommentMutation, data: comentario } = useMutation(
    createComment,
    {
      onSuccess: data => {
        console.log(data);
        // Invalido la cache de los comentarios en vez de usar setQueryData
        queryClient.invalidateQueries(['comments', especie.id]);
        // Invalido cache achievements si se obtiene logro:
        if (data.logro) {
          queryClient.invalidateQueries(['achievements', usuario?.id]);
        }
        // Limpio el contenido del comentario
        setContent('');
        // Muestro un mensaje de éxito
        toast.success('Comentario agregado');
      },
      onError: error => {
        // Muestro un mensaje de error
        toast.error(error.response.data.message);
      }
    }
  );

  return (
    <>
      {/* Escribir comentario */}
      <div className="flex items-start space-x-4 p-2 rounded-lg bg-white shadow">
        <div className="min-w-full flex-1 pt-2">
          <form
            onSubmit={e => {
              e.preventDefault();
              if (usuario) {
                if (content) {
                  createCommentMutation({
                    content,
                    id_usuario: usuario.id,
                    id_especie: especie.id
                  });
                }
              } else {
                toast.error('Debes iniciar sesión para comentar');
              }
            }}
          >
            <div className="border border-gray-200 focus-within:border-emerald-600 ">
              <label htmlFor="comment" className="sr-only">
                Escribir comentario
              </label>
              <textarea
                rows={4}
                name="comment"
                id="comment"
                className="block w-full resize-none border-0 p-2 focus:border-emerald-600 focus:ring-0 sm:text-sm"
                placeholder="Escribir comentario..."
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className=" inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Comentar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-3">
          <h2
            className="text-base font-medium text-gray-900"
            id="announcements-title"
          >
            Comentarios ({comments?.count || 0})
          </h2>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {/* Muestro los comentarios usando el componente Comment */}
              {comments?.rows.map(comment => (
                <Comment key={comment.id} comentario={comment} />
              ))}
              {/* Muestro un mensaje si no hay comentarios */}
              {comments?.count === 0 && (
                <p className="text-gray-600 text-center py-4">
                  No hay comentarios
                </p>
              )}
            </ul>
          </div>
          <div className="mt-6">
            {/* Muestro un botón con ícono de flecha para mostrar más comentarios si hay más de 5 */}
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
                <ChevronDownIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Muestro un spinner si se están cargando los comentarios
      {isLoadingComments && (
        <div className="flex justify-center items-center py-4">
          <Spinner />
        </div>
      )} */}
        {comentario && comentario.logro && <Logro logro={comentario.logro} />}
      </div>
    </>
  );
};

export default CommentSection;
