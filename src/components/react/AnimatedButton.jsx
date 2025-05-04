import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  href, 
  isPrimary = true, 
  icon = null,
  onClick = null 
}) => {
  const buttonClasses = isPrimary 
    ? "inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
    : "inline-flex items-center justify-center px-6 py-2 border border-blue-500/50 text-blue-400 bg-transparent font-medium rounded-full hover:bg-blue-500/5 hover:border-blue-500 transition-all duration-300";
  
  return (
    <motion.a 
      href={href} 
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      {icon && (
        <motion.span 
          className="ml-2" 
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.a>
  );
};

export default AnimatedButton; 