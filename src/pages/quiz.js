// Archivo src\pages\quiz.js
import React, { useState, useEffect } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import QuizQuestion from '@/components/QuizQuestion';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import questions from '@/data/preguntas.json';
import Link from 'next/link';
import { useQuery, useMutation } from 'react-query';
import { crearCuestionario } from '@/api/cuestionarioApi';
import { toast } from 'react-toastify';

const Quiz = () => {
  const router = useRouter();
  const numQuestions = router.query.numQuestions;
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Obtener el id del usuario logeado
  const { data: usuario } = useQuery('usuario');

  // Crear una mutación para crear un nuevo registro de cuestionario que ha respondido el usuario
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    crearCuestionario,
    {
      onSuccess: () => {
        // Mostrar un toast que diga que se han almacenado los resultados
        toast.success('Se han almacenado los resultados');
      },
      onError: () => {
        // Mostrar un toast que diga que ocurrió un error al crear el cuestionario
        toast.error('Ocurrió un error al crear el cuestionario');
      }
    }
  );

  // Crear una función para enviar los datos del cuestionario al backend
  const enviarCuestionario = () => {
    // Verificar si el usuario está logeado
    if (usuario) {
      // Llamar a la mutación con los datos del cuestionario
      mutate({
        score,
        percentage,
        numQuestions,
        usuario_id: usuario.id
      });
    } else {
      // Mostrar un toast que diga que debe estar logeado para almacenar los resultados
      toast.info('Debes estar logeado para almacenar los resultados');
    }
  };

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
    const answeredAll =
      Object.keys(userAnswers).length === Number(numQuestions);

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

        // Cambiar el estado de score y percentage
        setScore(correctAnswers);
        setPercentage(Math.round((correctAnswers / numQuestions) * 100));

        // Cambiar el estado de submitted a true
        setSubmitted(true);
      }
    });
  };

  // Usar el Hook useEffect para llamar a la función enviarCuestionario cuando el estado de submitted sea true
  useEffect(() => {
    if (submitted) {
      enviarCuestionario();
    }
  }, [submitted]);

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
          {!submitted && (
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-8"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          )}
        </div>
        {submitted && (
          <div className="container mx-auto px-4 py-8 p-2 ">
            <h1 className="text-4xl font-bold text-center mb-4">
              Resultados del cuestionario
            </h1>
            <p className="text-xl text-center mb-8">
              Has completado el cuestionario de biodiversidad con {numQuestions}{' '}
              preguntas. Aquí puedes ver tu puntaje y tu porcentaje de aciertos.
              Y puedes ver las respuestas correctas{' '}
              <span className="text-green-500">mas arriba</span>.
            </p>
            <div className="flex flex-col items-center">
              <p className="text-3xl mb-4">
                Tu puntaje es: {score} de {numQuestions}
              </p>
              <p className="text-3xl mb-4">
                Tu porcentaje de aciertos es: {percentage}%
              </p>
            </div>
            {/* preguntar si desea realizar otro y redirijir a test.js */}
            <div className="flex flex-col items-center">
              <Link href="/test">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8">
                  Realizar otro cuestionario
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Quiz;
