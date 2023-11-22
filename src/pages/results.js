// Archivo src\pages\results.js
import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useRouter } from 'next/router';

const Results = () => {
  const router = useRouter();
  const score = router.query.score; // Obtener el puntaje del usuario de la url
  const numQuestions = router.query.numQuestions; // Obtener el número de preguntas de la url

  // Calcular el porcentaje de aciertos
  const percentage = Math.round((score / numQuestions) * 100);

  return (
    <DefaultLayout title="Resultados del cuestionario">
      <div className="container mx-auto px-4 py-8 p-2 rounded-lg bg-white shadow">
        <h1 className="text-4xl font-bold text-center mb-4">
          Resultados del cuestionario
        </h1>
        <p className="text-xl text-center mb-8">
          Has completado el cuestionario de biodiversidad con {numQuestions}{' '}
          preguntas. Aquí puedes ver tu puntaje y tu porcentaje de aciertos.
        </p>
        <div className="flex flex-col items-center">
          <p className="text-3xl mb-4">Tu puntaje es: {score}</p>
          <p className="text-3xl mb-4">
            Tu porcentaje de aciertos es: {percentage}%
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Results;
