// src/components/PageWrapper.jsx

import { motion } from 'framer-motion';
import Navbar from './SideBar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -30 },
};

const pageTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

const PageWrapper = ({ children }) => {
  const location = useLocation();

  // Optional: Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="p-4 md:p-6"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default PageWrapper;
