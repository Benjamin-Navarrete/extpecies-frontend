// Archivo src\pages\test.js
import React, { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Slider from '@/components/Slider';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const Test = () => {
  const [numQuestions, setNumQuestions] = useState(10);
  const router = useRouter();

  const handleStart = () => {
    Swal.fire({
      title:
        '¿Estás seguro de que quieres comenzar el cuestionario con ' +
        numQuestions +
        ' preguntas?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        router.push({
          pathname: '/quiz',
          query: { numQuestions }
        });
      }
    });
  };

  return (
    <DefaultLayout title="¿Listo para desafiar tus conocimientos de biodiversidad?¡Ponte a prueba!">
      <div className="container mx-auto px-4 py-8 p-2 rounded-lg bg-white shadow">
        <h1 className="text-4xl font-bold text-center mb-4">
          ¿Listo para desafiar tus conocimientos de biodiversidad?¡Ponte a
          prueba!
        </h1>
        <p className="text-xl text-center mb-8 px-3">
          ¿Crees que sabes suficiente acerca de las especies en peligro de
          extinción? Pon a prueba tus conocimientos en nuestro cuestionario y
          guarda tu puntaje en tu cuenta para seguir tus avances y estadísticas.
        </p>
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-4">
            Elige la cantidad de preguntas que quieres responder:
          </p>
          <Slider
            value={numQuestions}
            onChange={e => setNumQuestions(e.target.value)}
          />
          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={handleStart}
          >
            Comenzar
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Test;
