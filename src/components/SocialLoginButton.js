export default function SocialLoginButton({ platform, icon }) {
  return (
    <a
      href="#"
      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-4 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
    >
      <span className="sr-only ">Sign in with {platform}</span>
      {icon}
    </a>
  );
}
