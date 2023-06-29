// Archivo src/pages/history.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultLayout from '@/layouts/DefaultLayout';
import HistoryTable from '@/components/Tables/HistoryTable';
import axios from 'axios'; // Importar axios
import jwtDecode from 'jwt-decode'; // Importar jwt-decode

const HistoryPage = () => {
  const router = useRouter();
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  // Crear un estado para guardar los datos del historial
  const [data, setData] = useState([]);

  // Crear una función para obtener los datos del historial desde el servidor
  const getHistorial = async usuarioId => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/historial/${usuarioId}`
      );
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const checkPermissions = () => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const { permisos } = JSON.parse(atob(token.split('.')[1]));

      if (!permisos.includes('MEN_03')) {
        toast.error('No tienes permisos para ver esta página');
        setTimeout(() => {
          router.push('/login');
        }, 20000); // Tiempo de espera antes de la redirección
        return;
      }

      setHasPermissions(true);
      setLoadingPermissions(false);
    };

    checkPermissions();
  }, []);

  // Usar un efecto para obtener los datos del historial cuando se monte el componente
  useEffect(() => {
    // Obtener el token desde la cookie
    const token = Cookies.get('token');

    // Verificar si el token existe
    if (token) {
      // Decodificar el token y obtener el id del usuario
      const { id } = jwtDecode(token);

      // Invocar la función getHistorial con el id del usuario
      getHistorial(id);
    } else {
      // Mostrar un mensaje de error o redirigir al usuario a la página de login
      toast.error('Debes iniciar sesión para ver tu historial');
      router.push('/login');
    }
  }, []); // No pasar ninguna dependencia al efecto

  // Si los permisos aún no han sido cargados, renderizar un componente de carga o nada
  if (loadingPermissions) {
    return null; // O reemplaza esto con un componente de carga
  }

  // Si el usuario no tiene permisos, redirige a login
  if (!hasPermissions) {
    router.push('/login');
    return null;
  }

  return (
    <DefaultLayout>
      <div className="pb-20 pt-5">
        <div className="flex flex-col items-center justify-center">
          {/* Renderizar el componente HistoryTable pasándole los datos del historial */}
          <HistoryTable data={data} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HistoryPage;
