import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./SplashScreen.scss";
import GarageLogo from "../../assets/icons/garage-logo.png";

const SplashScreen: React.FC = () => {
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
            <img src={GarageLogo} alt="" />
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

export default SplashScreen;
