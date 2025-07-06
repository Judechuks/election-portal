import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedHeader = ({ title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className="text-center space-y-2">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold textgray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-600 dark:text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedHeader;
