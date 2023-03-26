import QuestionCard from '@/components/QuestionCard';
import DefaultLayout from '@/layouts/DefaultLayout';

const imageUrl = 'https://placehold.co/500x500';

const question1 = {
  question: '¿Qué es una especie endémica?',
  alternatives: [
    'a) Una especie que solo se distribuye de forma natural en un área',
    'b) Una especie que puede encontrarse en diversos países de forma natural',
    'c) Una especie que se establece en un territorio diferente a su ecosistema original',
    'd) Una especie que se establece e invade el ecosistema de otras especies',
  ],
};

const Test = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4">
        <QuestionCard
          index={1}
          imageUrl={imageUrl}
          question={question1.question}
          alternatives={question1.alternatives}
        />
      </div>
    </DefaultLayout>
  );
};

export default Test;
