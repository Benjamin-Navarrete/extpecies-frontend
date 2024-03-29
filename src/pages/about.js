import DefaultLayout from '@/layouts/DefaultLayout';
import Link from 'next/link';

const About = () => {
  return (
    <DefaultLayout>
      <section className="bg-white">
        <div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2  lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Acerca de Extpecies
            </h2>
            <p className="mt-6 mb-4 text-lg leading-8 text-justify font-normal text-gray-600">
              Extpecies es una organización independiente enfocada en el
              desarrollo de aplicaciones web para concientizar sobre la
              importancia de proteger y preservar las especies en peligro. Nos
              centramos en la flora y fauna que se encuentran en categorías de
              Amenazada y Extinta en el mundo.
            </p>
            <p className="mt-6 text-lg leading-8 text-justify font-normal text-gray-600">
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
          <div className="grid gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="/logo.png"
              alt="office content 1"
            />
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2  lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Acerca del Mapa de Extpecies
            </h2>
            <p className="mt-6 mb-4 text-lg leading-8 text-justify font-normal text-gray-600">
              El Mapa de Extpecies ha sido creado con el objetivo de brindar una
              visualización sencilla a las especies amenazadas del mundo. A
              través de este mapa, puedes navegar de una manera intuitiva y, al
              hacer clic en una especie, se abrirá una ventana emergente que
              mostrará la información más relevante de la especie.
            </p>
            <p className="mt-6 mb-4 text-lg leading-8 text-justify font-normal text-gray-600">
              Las especies son una recopilación simplificada de la Lista Roja de
              las especies amenazadas de la IUCN (Unión Internacional para la
              Conservación de la Naturaleza). Para cada especie podrás
              visualizar su nombre común, nombre científico, imagen, reino,
              filo, clase, orden, familia, género, estado de conservación,
              descripción geográfica y las amenazas. Existen 3 grandes
              categorías de conservación, con varias subcategorías:
            </p>
            <ul className="space-y-4 text-gray-500 list-disc list-inside">
              <li>
                <span className="font-semibold">Bajo Riesgo</span>
                <ul className="pl-5 mt-2 space-y-1 list-inside">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/img/categoriasConservacion/LC.png"
                        alt="Least Concern"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <li>Preocupación Menor (LC)</li>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/img/categoriasConservacion/NT.png"
                        alt="Near Threatened"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <li>Casi amenazada (NT)</li>
                    </div>
                  </div>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Amenazada</span>
                <ul className="pl-5 mt-2 space-y-1 list-inside">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/img/categoriasConservacion/VU.png"
                        alt="Vulnerable"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <li>Vulnerable (VU)</li>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/img/categoriasConservacion/EN.png"
                        alt="Endangered"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <li>En peligro (EN)</li>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/img/categoriasConservacion/CR.png"
                        alt="Critically Endangered"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <li>En peligro crítico (CR)</li>
                    </div>
                  </div>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Extinta</span>
                <ul className="pl-5 mt-2 space-y-1 list-inside">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/img/categoriasConservacion/EW.png"
                        alt="Extinct in the Wild"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <li>Extinta en estado silvestre (EW)</li>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/img/categoriasConservacion/EX.png"
                        alt="Extinct"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <li>Extinta (EX)</li>
                    </div>
                  </div>
                </ul>
              </li>
            </ul>
            <p className="mt-6 mb-4 text-lg leading-8 text-justify font-normal text-gray-600">
              Además, existen las categorías{' '}
              <span className="font-semibold">No evaluado (NE)</span> para
              especies que no han sido clasificadas y la categoría{' '}
              <span className="font-semibold">Datos insuficientes (DD)</span>{' '}
              correspondiente a especies que no poseen suficiente información
              para ser evaluadas.
            </p>
          </div>
          <div className="grid gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="/img/imagenMapa.png"
              alt="office content 1"
            />
            <div className="mt-2 flex items-center">
              <Link
                href="/map"
                className="rounded-md bg-emerald-600 px-3.5 py-1.5 mx-auto font-semibold leading-7 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Ver mapa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default About;
