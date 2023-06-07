// Archivo src/pages/test.js
import { useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import DefaultLayout from '@/layouts/DefaultLayout';
import preguntas from '@/data/preguntas.json';

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
    // Definimos las respuestas correctas
    const correctas = {
      1: 'a',
      2: 'b',
      3: 'c',
      4: 'b'
    };

    // Inicializamos una variable para guardar el puntaje
    let puntaje = 0;

    // Recorremos las respuestas del usuario y las comparamos con las correctas
    for (let index in respuestas) {
      if (respuestas[index] === correctas[index]) {
        // Si la respuesta es correcta, sumamos un punto al puntaje
        puntaje++;
      }
    }

    // Mostramos un modal con el puntaje obtenido
    alert(`Tu puntaje es ${puntaje} de ${preguntas.length}`);
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4">
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

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Enviar test
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Test;
