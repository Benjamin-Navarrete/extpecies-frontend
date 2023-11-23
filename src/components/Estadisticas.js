// Archivo src/components/EstadisticasUsuario.js
import React from 'react';
import { useCuestionarios } from '../hooks/useCuestionarios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { mean, max, min } from 'lodash';
import {
  ChartBarSquareIcon,
  CheckIcon,
  ClockIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

// Crear el componente que reciba el id del usuario como prop
const EstadisticasUsuario = ({ usuario }) => {
  // Usar el custom hook para obtener los datos de los cuestionarios
  const { data, isLoading, isError, error } = useCuestionarios(usuario.id);

  // Si está cargando, mostrar un mensaje
  if (isLoading) {
    return <p className="text-white">Cargando...</p>;
  }

  // Si hay un error, mostrar un mensaje
  if (isError) {
    return <p className="text-red-500">{error.message}</p>;
  }

  // Si no hay datos, mostrar un mensaje
  if (!data || data.length === 0) {
    return (
      <div className="col-span-1 flex flex-col p-8 divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
        <p className="text-gray-500 text-2xl font-medium">
          No hay cuestionarios respondidos por este usuario.
        </p>
      </div>
    );
  }

  // Preparar los datos para el gráfico de líneas
  const chartData = data.map(c => ({
    fecha: format(new Date(c.fecha_hora), 'dd/MM/yyyy', { locale: es }),
    porcentaje: c.percentage
  }));

  // Calcular las estadísticas de los puntajes
  const promedio = mean(data.map(c => c.percentage)).toFixed(2);
  const mejor = max(data.map(c => c.percentage));
  const peor = min(data.map(c => c.percentage));
  const totalCuestionarios = data.length;
  const totalPreguntas = data.reduce((acc, c) => acc + c.num_questions, 0);
  // Crear una copia de los datos y ordenarla
  const sortedData = [...data].sort(
    (a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora)
  );

  return (
    // Usar un grid de dos columnas responsivas con un gap de 4
    // Agregar una clase bg-gradient-to-r para aplicar un fondo con un gradiente de colores
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Gráfico</h1>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip className="transition-all" />
            <Legend className="transform rotate-90" />
            <Line
              type="monotone"
              dataKey="porcentaje"
              stroke="#3B82F6"
              className="animate-pulse hover:scale-105"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          Estadísticas del Cuestionario
        </h1>
        <dl className="text-lg">
          <dt className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
            Promedio
          </dt>
          <dd className="ml-7 border-b-2">{promedio}%</dd>
          <dt className="flex items-center">
            <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
            Mejor puntaje
          </dt>
          <dd className="ml-7 border-b-2">{mejor}%</dd>
          <dt className="flex items-center">
            <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
            Peor puntaje
          </dt>
          <dd className="ml-7 border-b-2">{peor}%</dd>
          <dt className="flex items-center">
            <ChartBarSquareIcon className="h-5 w-5 text-blue-400 mr-2" />
            Total de cuestionarios
          </dt>
          <dd className="ml-7 border-b-2">{totalCuestionarios}</dd>
          <dt className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
            Total de preguntas
          </dt>
          <dd className="ml-7 border-b-2">{totalPreguntas}</dd>
        </dl>
      </div>
      <div className="bg-white shadow-lg p-4 rounded-lg ">
        <h1 className="text-2xl font-bold mb-4">Historial</h1>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200 font-bold ">
            <tr>
              <td className="p-2">Fecha y hora</td>
              <td className="p-2">Porcentaje</td>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(c => (
              <tr key={c.id}>
                <td className="p-2 text-start">
                  {format(new Date(c.fecha_hora), 'dd/MM/yyyy HH:mm', {
                    locale: es
                  })}
                </td>
                <td className="p-2 text-start">{c.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstadisticasUsuario;
