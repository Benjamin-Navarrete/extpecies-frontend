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
  },
  {
    name: 'Logro 2',
    email:
      'Amet veniam eu commodo ut ut reprehenderit. Pariatur cillum nisi sint elit non voluptate proident eu magna proident ad id. Exercitation qui non amet proident laborum. Cillum deserunt enim ut reprehenderit ipsum dolore tempor laboris excepteur ea tempor laborum nulla. Eiusmod in tempor ad eu ut nisi excepteur duis. Ex quis anim nulla culpa sint incididunt voluptate anim pariatur et eiusmod.',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://placehold.co/50x50',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z'
  },
  {
    name: 'Logro 3',
    email:
      'Esse ea ut incididunt ut quis minim. Mollit ea labore commodo nulla quis laboris deserunt in est ea occaecat anim velit sit. Ullamco minim exercitation officia mollit elit dolore pariatur ex ad sit fugiat. Pariatur veniam do officia esse occaecat.',
    role: 'Business Relations',
    imageUrl: 'https://placehold.co/50x50',
    lastSeen: null
  },
  {
    name: 'Logro 4',
    email:
      'Consequat officia minim irure ut non nisi labore in tempor aliqua enim do veniam ea. Duis dolore cupidatat aliqua duis et velit ullamco laboris aliquip nulla laborum laboris id. Incididunt cillum amet anim id veniam eiusmod laborum deserunt aute consequat id consequat anim adipisicing.',
    role: 'Front-end Developer',
    imageUrl: 'https://placehold.co/50x50',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z'
  },
  {
    name: 'Logro 5',
    email:
      'Lorem non duis commodo mollit mollit magna reprehenderit pariatur nisi id voluptate irure ex. Adipisicing laborum minim labore adipisicing mollit ipsum culpa occaecat ullamco in nisi cupidatat voluptate. Ex anim aliqua excepteur duis velit dolor aute tempor aute dolor deserunt occaecat. Ex cillum sit cupidatat incididunt dolor eiusmod commodo. Tempor consequat veniam enim aliqua nostrud quis minim enim consectetur voluptate occaecat dolor. Dolor sit minim aute aliquip eu veniam labore Lorem.',
    role: 'Designer',
    imageUrl: 'https://placehold.co/50x50',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z'
  },
  {
    name: 'Tom Cook',
    email:
      'Laborum commodo in incididunt cillum irure. Nostrud commodo id elit et in et sint dolore voluptate aliqua duis officia non. Adipisicing et amet est consectetur est cillum culpa in tempor. Tempor aliqua ullamco eu deserunt deserunt.',
    role: 'Director of Product',
    imageUrl: 'https://placehold.co/50x50',
    lastSeen: null
  }
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
