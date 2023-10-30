// src/components/Comentario.js
import { Fragment, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { updateComment, deleteComment } from '@/api/commentApi';
import { toast } from 'react-toastify';

const Comentario = ({ comentario }) => {
  console.log('comentario', comentario);
  const queryClient = useQueryClient();
  const { data: usuario } = useQuery('usuario');
  const [editando, setEditando] = useState(false);
  const [contenido, setContenido] = useState(comentario.contenido);

  const mutationActualizar = useMutation(updateComment, {
    onSuccess: data => {
      toast.success('Comentario actualizado');
      // Invalido la cache de los comentarios en vez de usar setQueryData
      queryClient.invalidateQueries(['comments', comentario.especieId]);
      setEditando(false);
    },
    onError: error => {
      toast.error(error.response.data.message);
    }
  });

  const mutationEliminar = useMutation(deleteComment, {
    onSuccess: data => {
      toast.success('Comentario eliminado');
      // Invalido la cache de los comentarios en vez de usar setQueryData
      queryClient.invalidateQueries(['comments', comentario.especieId]);
    },
    onError: error => {
      toast.error(error.response.data.message);
    }
  });

  const handleEditar = () => {
    setEditando(true);
  };

  const handleCancelar = () => {
    setEditando(false);
    setContenido(comentario.contenido);
  };

  const handleGuardar = () => {
    mutationActualizar.mutate({
      id: comentario.id,
      contenido,
      id_usuario: usuario.id
    });
  };

  const handleEliminar = () => {
    mutationEliminar.mutate({
      id_comentario: comentario.id,
      id_usuario: usuario.id
    });
  };

  return (
    <li className="py-5">
      <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
        <h3 className="text-sm font-semibold text-gray-800">
          {comentario.usuario.nombres} {comentario.usuario.apellidos}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {new Date(comentario.fecha).toLocaleString()}
        </p>
        {editando ? (
          <Fragment>
            <textarea
              className="mt-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              value={contenido}
              onChange={e => setContenido(e.target.value)}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleGuardar}
              >
                Guardar
              </button>
            </div>
          </Fragment>
        ) : (
          <p className="mt-2 text-sm text-gray-800">{comentario.contenido}</p>
        )}
        {usuario?.id === comentario.usuarioId && !editando && (
          <div className="mt-2 flex justify-end space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={handleEditar}
            >
              Editar
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleEliminar}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default Comentario;
