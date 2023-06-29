import DefaultLayout from '@/layouts/DefaultLayout';
import Link from 'next/link';

export default function Inicio() {
  return (
    <DefaultLayout>
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-24 lg:pb-56 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                Explora, Aprende y Protege
              </h1>
              <p className="mt-6 text-lg leading-8 text-justify text-gray-600">
                Descubre especies en peligro de extinción de América Latina con
                nuestro mapa interactivo, aumenta tus conocimientos y contribuye
                a la conservación de nuestra biodiversidad. ¡Anímate a explorar!
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/map"
                  className="rounded-md bg-emerald-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Ver mapa
                </Link>
                <Link
                  href="/about"
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  Mas información <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              src= "/img/americalatina.jpg"
              alt= ""
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
