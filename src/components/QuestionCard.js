// Archivo src/components/QuestionCard.js
import { useState } from 'react';

const QuestionCard = ({ index, question, alternatives, onSelect }) => {
  // Creamos un estado para guardar la alternativa seleccionada por el usuario
  const [selected, setSelected] = useState(null);

  // Creamos una función para manejar el cambio de la alternativa seleccionada
  const handleChange = e => {
    // Obtenemos el valor de la alternativa seleccionada
    const value = e.target.value;
    // Actualizamos el estado con el valor
    setSelected(value);
    // Llamamos a la función onSelect que nos pasaron como prop con el valor
    onSelect(value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 m-6">
      <h2 className="text-lg font-bold mb-2">
        {index}. {question}
      </h2>
      <div className="grid grid-cols gap-2">
        {alternatives.map((alternative, i) => (
          <label key={i} className="flex items-center">
            <input
              type="radio"
              name={`question-${index}`}
              value={alternative[0]}
              checked={selected === alternative[0]}
              onChange={handleChange}
              className="mr-2"
            />
            {alternative}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
