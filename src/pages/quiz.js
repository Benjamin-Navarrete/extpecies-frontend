// Archivo src\pages\quiz.js
import React, { useState, useEffect } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import QuizQuestion from '@/components/QuizQuestion';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import questions from '@/data/preguntas.json';

const Quiz = () => {
  const router = useRouter();
  const numQuestions = router.query.numQuestions; // Obtener la cantidad de preguntas de la url
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Estado para guardar las preguntas seleccionadas
  const [userAnswers, setUserAnswers] = useState({}); // Estado para guardar las respuestas del usuario
  const [score, setScore] = useState(0); // Estado para guardar el puntaje
  const [submitted, setSubmitted] = useState(false); // Estado para indicar si el usuario ha enviado el cuestionario

  useEffect(() => {
    // Función para mezclar el array de preguntas
    const shuffleArray = array => {
      let currentIndex = array.length,
        randomIndex;

      // Mientras queden elementos para mezclar...
      while (currentIndex != 0) {
        // Elegir un elemento al azar
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // E intercambiarlo con el elemento actual
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ];
      }

      return array;
    };

    // Seleccionar las primeras n preguntas del array mezclado
    const selectQuestions = n => {
      const shuffledQuestions = shuffleArray(questions);
      return shuffledQuestions.slice(0, n);
    };

    // Actualizar el estado de las preguntas seleccionadas
    setSelectedQuestions(selectQuestions(numQuestions));
  }, [numQuestions]);

  // Función para manejar el cambio de respuesta del usuario
  const handleChangeAnswer = (question, answer) => {
    // Actualizar el estado de las respuestas del usuario
    setUserAnswers(prev => ({ ...prev, [question]: answer }));
  };

  // Función para manejar el envío de las respuestas
  const handleSubmit = () => {
    // Verificar si el usuario ha respondido todas las preguntas
    const answeredAll = Object.keys(userAnswers).length === numQuestions;

    // Mostrar un swal de confirmación
    Swal.fire({
      title: answeredAll
        ? '¿Estás seguro de que quieres enviar tus respuestas?'
        : '¿Seguro que deseas enviarlo? No has contestado todo',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        // Calcular el puntaje
        let correctAnswers = 0;
        for (let question of selectedQuestions) {
          if (userAnswers[question.enunciado] === question.correcta) {
            correctAnswers++;
          }
        }
        setScore(correctAnswers);

        // Cambiar el estado de submitted a true
        setSubmitted(true);
      }
    });
  };

  return (
    <DefaultLayout title="Cuestionario de biodiversidad">
      <div className="container mx-auto px-4 py-8 p-2 rounded-lg bg-white shadow">
        <h1 className="text-4xl font-bold text-center mb-4">
          Cuestionario de biodiversidad
        </h1>
        <p className="text-xl text-center mb-8">
          Responde las siguientes preguntas y comprueba tu nivel de conocimiento
          sobre las especies en peligro de extinción.
        </p>
        <div className="flex flex-col items-center">
          {selectedQuestions.map((question, index) => (
            // Mostrar cada pregunta con sus opciones de respuesta
            <QuizQuestion
              key={index}
              question={question}
              userAnswer={userAnswers[question.enunciado]}
              onChangeAnswer={handleChangeAnswer}
              submitted={submitted} // Pasar el estado de submitted como prop
            />
          ))}
          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Quiz;
