import DefaultLayout from '@/layouts/DefaultLayout';

const About = () => {
  return (
    <DefaultLayout>
      <section className="bg-white">
        <div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2  lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Acerca de Extpecies
            </h2>
            <p className="mt-6 mb-4 text-lg leading-8 font-normal text-gray-600">
              Extpecies es una organización independiente enfocada en el
              desarrollo de aplicaciones web para concientizar sobre la
              importancia de proteger y preservar las especies en peligro. Nos
              centramos en la flora y fauna de América Latina, una región rica
              en biodiversidad y hogar de numerosas especies amenazadas por la
              extinción.
            </p>
            <p className="mt-6 text-lg leading-8 font-normal text-gray-600">
              Nuestra aplicación ofrece una experiencia visual, educativa y de
              alcance global, permitiendo a los usuarios aprender y tomar
              acciones en favor de estas especies vitales. Nuestra misión es
              promover la conciencia y responsabilidad ambiental, impulsando el
              conocimiento y apreciación de las especies en peligro en nuestras
              regiones de enfoque. Al proporcionar información accesible y
              atractiva, buscamos inspirar a la acción y colaborar en la
              conservación de nuestro invaluable patrimonio natural.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://placehold.co/590x822?text=Imagen 1"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://placehold.co/590x822?text=Imagen 2"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default About;
