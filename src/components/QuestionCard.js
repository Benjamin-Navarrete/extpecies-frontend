const QuestionCard = ({ index, imageUrl, question, alternatives }) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
        <div className="col-span-1 sm:col-span-1">
          <img
            src={imageUrl}
            alt={`Pregunta ${index}`}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="col-span-3 sm:col-span-3">
          <h3 className="text-xl font-semibold mb-4">
            {index}) {question}
          </h3>
          {alternatives.map((alternative, i) => (
            <div key={i} className="flex items-center mb-2">
              <input
                className="form-checkbox text-blue-500"
                type="checkbox"
                id={`alternative-${index}-${i}`}
                value={`option${index}-${i}`}
                name={`question-${index}`}
              />
              <label className="ml-2" htmlFor={`alternative-${index}-${i}`}>
                {alternative}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
