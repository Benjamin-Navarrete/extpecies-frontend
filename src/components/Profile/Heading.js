// Archivo src\components\Profile\Heading.js

const serverUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

// const profile = {
//   name: 'Ricardo Cooper',
//   email: 'ricardo.cooper@example.com',
//   avatar: 'https://placehold.co/500x500',
//   backgroundImage: 'https://placehold.co/1980x1050',
//   fields: [
//     ['Phone', '(555) 123-4567'],
//     ['Email', 'ricardocooper@example.com'],
//     ['Title', 'Senior Front-End Developer'],
//     ['Team', 'Product Development'],
//     ['Location', 'San Francisco'],
//     ['Sits', 'Oasis, 4th floor'],
//     ['Salary', '$145,000'],
//     ['Birthday', 'June 8, 1990']
//   ]
// };

export default function ProfileHeading({ usuario }) {
  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={serverUrl + '/' + usuario?.fotoPortada}
          alt=""
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={serverUrl + '/' + usuario?.fotoPerfil}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {usuario?.nombres} {usuario?.apellidos}
              </h1>
            </div>
            <div className="justify-stretch text-gray-600 mt-8 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              {/* <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              > */}
              {/* <EnvelopeIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
              {/* <span>Seguidores 20</span>
              <span>Seguidos 14</span> */}
              {/* </button> */}
              {/* <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <PhoneIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
              {/* </button> */}
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {usuario?.nombres}
          </h1>
        </div>
      </div>
    </div>
  );
}
