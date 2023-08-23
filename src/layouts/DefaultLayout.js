// Archivo src\layouts\DefaultLayout.js
import Navbar from '@/components/MainNavbar';
import Footer from '@/components/Footer';
import PropTypes from 'prop-types';

const DefaultLayout = props => {
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

DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
