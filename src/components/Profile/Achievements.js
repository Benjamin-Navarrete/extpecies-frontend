// Archivo src\components\Profile\Achievements.js
const people = [
  {
    name: 'Logro 1',
    email:
      'Consectetur consequat duis adipisicing consectetur duis ipsum. Commodo ut incididunt esse ut esse ipsum et exercitation qui Lorem nostrud. Lorem ipsum exercitation cillum fugiat ullamco fugiat in id Lorem aliqua cillum laboris voluptate. Nulla officia reprehenderit aute ex nostrud incididunt veniam enim consequat. Veniam laboris id ipsum laborum et.',
    role: 'Co-Founder / CEO',
    imageUrl: 'https://placehold.co/50x50',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z'
  }
  // . . . resto de logros
];

export default function Achievements() {
  return (
    <ul role="list" className="divide-y divide-gray-100 mt-4">
      {people.map(person => (
        <li
          key={person.email}
          className="flex justify-between gap-x-6 py-5 my-2 bg-white rounded-lg shadow"
        >
          <div className="flex min-w-0 gap-x-4 pl-6">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.imageUrl}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.name}
              </p>
              <p className="mt-1 pr-10 text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
          {/* <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{person.role}</p>
            {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen{' '}
                <time dateTime={person.lastSeenDateTime}>
                  {person.lastSeen}
                </time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div> */}
        </li>
      ))}
    </ul>
  );
}
