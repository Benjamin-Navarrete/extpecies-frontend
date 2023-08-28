// Archivo src/pages/profile.js
import Heading from '@/components/Profile/Heading';
import DefaultLayout from '@/layouts/DefaultLayout';
import Tabs from '@/components/Profile/Tabs';

export default function Profile() {
  return (
    <>
      <DefaultLayout>
        <Heading />
        <Tabs />
      </DefaultLayout>
    </>
  );
}
