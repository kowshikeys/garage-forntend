import React, { useState, useEffect } from "react";
import "./Preloader.scss";
import { AnimatePresence, motion } from "framer-motion";

const Preloader: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className="splashscreen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="splashscreen_main">
            <h2>processing...</h2>
          </div>
          <div className="splashscreen_footer">
            <p>acessing securely.</p>
            <div className="splash_loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
