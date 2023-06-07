// Archivo src/pages/test.js
import { useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import DefaultLayout from '@/layouts/DefaultLayout';
import preguntas from '@/data/preguntas.json';
// Importamos el paquete de sweet alerts
import Swal from 'sweetalert2';

const Test = () => {
  // Creamos un estado para guardar las respuestas del usuario
  const [respuestas, setRespuestas] = useState({});

  // Creamos una función para actualizar el estado cuando el usuario selecciona una alternativa
  const handleSelect = (index, value) => {
    setRespuestas({
      ...respuestas,
      [index]: value
    });
  };

  // Creamos una función para enviar el test y calcular el puntaje
  const handleSubmit = () => {
    // Inicializamos una variable para guardar el puntaje
    let puntaje = 0;

    // Recorremos las respuestas del usuario y las comparamos con las correctas
    for (let index in respuestas) {
      if (respuestas[index] === preguntas[index - 1].correcta) {
        // Si la respuesta es correcta, sumamos un punto al puntaje
        puntaje++;
      }
    }

    // Mostramos un modal con el puntaje obtenido usando sweet alerts
    Swal.fire({
      title: 'Tu puntaje',
      text: `${puntaje} de ${preguntas.length}`,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 max-w-5xl">
        {preguntas.map((pregunta, index) => (
          // Usamos el componente QuestionCard para mostrar cada pregunta con sus alternativas
          <QuestionCard
            key={index}
            index={index + 1}
            question={pregunta.enunciado}
            alternatives={[pregunta.a, pregunta.b, pregunta.c, pregunta.d]}
            // Pasamos la función handleSelect como prop para que se ejecute cuando el usuario seleccione una alternativa
            onSelect={value => handleSelect(index + 1, value)}
          />
        ))}

        <div className="flex justify-end px-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Enviar test
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Test;
