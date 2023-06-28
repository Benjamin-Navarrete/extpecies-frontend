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
          <div className="grid gap-4 mt-8">
          <img
              className="w-full rounded-lg"
              src="/logo.png"
              alt="office content 1"
            />
          </div>
        </div>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        <div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2  lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Acerca del Mapa de Extpecies
            </h2>
            <p className="mt-6 mb-4 text-lg leading-8 font-normal text-gray-600">
              El Mapa de Extpecies ha sido creado con el objetivo de brindar una visualización sencilla a las especies amenazadas de América Latina. A través de este mapa, puedes navegar de una manera intuitiva y, al hacer clic en una especie, se abrirá una ventana emergente que mostrará la información más relevante de la especie.
            </p>
            <p className="mt-6 mb-4 text-lg leading-8 font-normal text-gray-600">
              Las especies son una recopilación simplificada de la Lista Roja de las especies amenazadas de la IUCN (Unión Internacional para la Conservación de la Naturaleza). Para cada especie podrás visualizar su nombre común, nombre científico, imágen, reino, familia, estado de conservación, descripción geográfica y las amenazas. Existen 3 grandes categorías de conservación, con varias subcategorías:
            </p>
            <ul class="space-y-4 text-gray-500 list-disc list-inside">
              <li>
                <span className='font-semibold'>Bajo Riesgo</span>
                <ul class="pl-5 mt-2 space-y-1 list-inside">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="/img/categoriasConservacion/LC.png" alt="Least Concern"/>
                    </div>
                    <div class="flex-1 min-w-0">
                      <li>Preocupación Menor (LC)</li>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="/img/categoriasConservacion/NT.png" alt="Near Threatened"/>
                    </div>
                    <div class="flex-1 min-w-0">
                      <li>Casi amenazada (NT)</li>
                    </div>
                  </div>
                </ul>
              </li>
              <li>
                <span className='font-semibold'>Amenazada</span>
                <ul class="pl-5 mt-2 space-y-1 list-inside">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="/img/categoriasConservacion/VU.png" alt="Vulnerable"/>
                    </div>
                    <div class="flex-1 min-w-0">
                      <li>Vulnerable (VU)</li>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="/img/categoriasConservacion/EN.png" alt="Endangered"/>
                    </div>
                    <div class="flex-1 min-w-0">
                      <li>En peligro (EN)</li>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="/img/categoriasConservacion/CR.png" alt="Critically Endangered"/>
                    </div>
                    <div class="flex-1 min-w-0">
                      <li>En peligro crítico (CR)</li>
                    </div>
                  </div>
                </ul>
              </li>
              <li>
                <span className='font-semibold'>Extinta</span>
                <ul class="pl-5 mt-2 space-y-1 list-inside">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="/img/categoriasConservacion/EW.png" alt="Extinct in the Wild"/>
                    </div>
                    <div class="flex-1 min-w-0">
                      <li>Extinta en estado silvestre (EW)</li>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="/img/categoriasConservacion/EX.png" alt="Extinct"/>
                    </div>
                    <div class="flex-1 min-w-0">
                      <li>Extinta (EX)</li>
                    </div>
                  </div>
                </ul>
              </li>
            </ul>
            <p className="mt-6 mb-4 text-lg leading-8 font-normal text-gray-600">
            Además, existen las categorías <span className='font-semibold'>No evaluado (NE)</span> para especies que no han sido clasificadas y la categoría <span className='font-semibold'>Datos insuficientes (DD)</span> correspondiente a especies que no poseen suficiente información para ser evaluadas.
            </p>
          </div>
          <div className="grid gap-4 mt-8">
          <img
              className="w-full rounded-lg"
              src="/img/imagenMapa.png"
              alt="office content 1"
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default About;
