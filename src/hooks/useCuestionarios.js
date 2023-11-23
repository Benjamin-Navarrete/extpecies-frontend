// Archivo src/hooks/useCuestionarios.js
import { useQuery } from 'react-query';
import { obtenerCuestionariosPorUsuarioId } from '../api/cuestionarioApi';

// Crear un custom hook que use la función obtenerCuestionariosPorUsuarioId
export const useCuestionarios = id => {
  return useQuery(['cuestionarios', id], () =>
    obtenerCuestionariosPorUsuarioId(id)
  );
};
