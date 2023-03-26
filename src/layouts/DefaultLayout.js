import Navbar from '@/components/MainNavbar';
import Footer from '@/components/Footer';

const DefaultLayout = (props) => {
  return (
    <>
      <Navbar />
      <div className="my-4 sm:mx-20">
        <main>{props.children}</main>
      </div>

      <Footer />
    </>
  );
};

export default DefaultLayout;
