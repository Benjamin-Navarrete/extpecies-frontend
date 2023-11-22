// Archivo src\components\QuizQuestion.js
import React from 'react';

const QuizQuestion = ({ question, userAnswer, onChangeAnswer, submitted }) => {
  // Desestructurar las propiedades de la pregunta
  const { enunciado, a, b, c, d, correcta, descripcion } = question;

  // Función para dar un estilo diferente a cada opción según si es correcta o incorrecta
  const getOptionStyle = option => {
    if (submitted) {
      // Si el usuario ha enviado el cuestionario
      if (option === correcta) {
        // Si la opción es la correcta, darle un estilo verde
        return 'bg-emerald-500 text-white';
      } else if (option === userAnswer) {
        // Si la opción es la que el usuario eligió y no es la correcta, darle un estilo rojo
        return 'bg-red-500 text-white';
      } else {
        // Si la opción no es la que el usuario eligió ni la correcta, darle un estilo gris
        return 'bg-gray-300 text-black';
      }
    } else {
      // Si el usuario no ha enviado el cuestionario
      if (option === userAnswer) {
        // Si la opción es la que el usuario ha elegido, darle un estilo amarillo
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      } else {
        // Si la opción no es la que el usuario ha elegido, darle un estilo azul
        return 'bg-gray-200 hover:bg-gray-300 text-black';
      }
    }
  };

  return (
    <div className="w-full max-w-full p-4 m-4 border rounded-lg">
      <p className="text-2xl mb-4">{enunciado}</p>
      <div className="grid grid-cols-2 gap-4">
        <button
          className={`py-2 px-4 rounded ${getOptionStyle('a')}`}
          onClick={() => onChangeAnswer(enunciado, 'a')}
          disabled={submitted} // Deshabilitar el botón si el usuario ha enviado el cuestionario
        >
          {a}
        </button>
        <button
          className={`py-2 px-4 rounded ${getOptionStyle('b')}`}
          onClick={() => onChangeAnswer(enunciado, 'b')}
          disabled={submitted} // Deshabilitar el botón si el usuario ha enviado el cuestionario
        >
          {b}
        </button>
        <button
          className={`py-2 px-4 rounded ${getOptionStyle('c')}`}
          onClick={() => onChangeAnswer(enunciado, 'c')}
          disabled={submitted} // Deshabilitar el botón si el usuario ha enviado el cuestionario
        >
          {c}
        </button>
        <button
          className={`py-2 px-4 rounded ${getOptionStyle('d')}`}
          onClick={() => onChangeAnswer(enunciado, 'd')}
          disabled={submitted} // Deshabilitar el botón si el usuario ha enviado el cuestionario
        >
          {d}
        </button>
      </div>
      {submitted &&
        userAnswer !== correcta && ( // Mostrar la descripción de la respuesta correcta en verde solo si el usuario ha enviado el cuestionario y se ha equivocado
          <p className="text-xl text-green-500 mt-4">{descripcion}</p>
        )}
    </div>
  );
};

export default QuizQuestion;
