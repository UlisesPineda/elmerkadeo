import PropTypes from 'prop-types';

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />
        { children }
      <Footer />
    </main>
  );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};
