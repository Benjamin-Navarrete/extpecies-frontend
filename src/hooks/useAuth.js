// Archivo src/hooks/useAuth.js
import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { login } from '@/api/userApi';

// Hook useAuth que devuelve los valores y funciones relacionados con la autenticación
export default function useAuth() {
  // Obtener la instancia del cliente de react query
  const queryClient = useQueryClient();

  const router = useRouter();

  // Guardar los permisos del usuario
  const [permisos, setPermisos] = useState([]);
  // Guardar el estado de autenticación del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Guardar el estado de carga de la sesión
  const [isLoading, setIsLoading] = useState(true);

  // Cargar los datos del usuario con useCallback
  const loadUserData = useCallback(() => {
    // Obtener el token desde el local storage
    const token = Cookies.get('token');
    if (token) {
      // Decodificar el token y obtener los permisos y los datos del usuario
      const decodedToken = jwtDecode(token);
      setPermisos(decodedToken.permisos || []);
      queryClient.setQueryData('usuario', decodedToken.usuario);

      // Actualizar el estado de autenticación a verdadero
      setIsAuthenticated(true);
    } else {
      // Actualizar el estado de autenticación a falso
      setIsAuthenticated(false);
    }
  }, [queryClient]);

  // Manejar el cierre de sesión del usuario con useCallback
  const handleLogout = useCallback(() => {
    // Eliminar el token de las cookies
    Cookies.remove('token');
    // Actualizar el estado de autenticación a falso
    setIsAuthenticated(false);
    // Vaciar el estado de permisos
    setPermisos([]);

    // Remover datos de usuario
    queryClient.removeQueries('usuario');

    // Mostrar un mensaje de éxito
    toast.success('Sesión cerrada con éxito');
    // Redirigir al usuario a la página de inicio
    router.push('/');
  }, [queryClient, router]);

  // Mutación de react query para el login
  const loginMutation = useMutation(
    // Pasar la función login como argumento
    values => login(values.correoElectronico, values.password),
    {
      // Manejar el éxito de la mutación
      onSuccess: data => {
        // Guardar el token en las cookies
        const token = data.token;
        Cookies.set('token', token);
        toast.success('Usuario autenticado exitosamente');

        // Guardar los datos del usuario en "usuario"
        queryClient.setQueryData('usuario', data.usuario);

        // Redirigir al usuario a la página principal
        router.push('/map');
      },
      // Manejar el error de la mutación
      onError: error => {
        toast.error(error.response.data.message);
      }
    }
  );

  // Efecto que se ejecuta cuando se monta el componente
  useEffect(() => {
    // Llamar a la función loadUserData para cargar los datos del usuario
    loadUserData();
    // Cuando termine de cargar los permisos, actualiza el estado de carga a falso
    setIsLoading(false);
  }, [loadUserData]);

  // Devolver los valores y funciones relacionados con la autenticación, incluyendo la mutación del login
  return {
    usuario: queryClient.getQueryData('usuario'),
    permisos,
    isAuthenticated,
    isLoading,
    loadUserData,
    handleLogout,
    loginMutation
  };
}
