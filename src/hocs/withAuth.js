// Archivo src\hocs\withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

// Componente de orden superior que recibe un componente y lo envuelve con una lógica de autenticación
export default function withAuth(Component) {
  // Crear una función que reciba las props del componente
  function Auth(props) {
    // Obtener el estado de autenticación y el estado de carga del hook useAuth
    const { isAuthenticated, isLoading } = useAuth();
    // Obtener la instancia del router de next
    const router = useRouter();

    // Efecto que se ejecuta cuando cambia el estado de autenticación o el estado de carga
    useEffect(() => {
      // Si el usuario no está autenticado y no está cargando la sesión
      if (!isAuthenticated && !isLoading) {
        // Redirigir al usuario a la página de login
        router.push('/login');
      }
    }, [isAuthenticated, isLoading, router]);

    // Devolver el componente envuelto con las props
    return <Component {...props} />;
  }

  // Devolver la función creada
  return Auth;
}
