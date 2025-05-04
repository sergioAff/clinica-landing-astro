import React from 'react';
import { motion } from 'framer-motion';

const AnimatedActionButton = ({ 
  children, 
  href, 
  isPrimary = true,
  icon = null,
  offset = -100 // Ajuste para compensar el header
}) => {
  const isAnchor = href && href.startsWith('#');

  const buttonClasses = isPrimary 
    ? "inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
    : "inline-flex items-center justify-center px-6 py-2 border border-blue-500/50 text-blue-400 bg-transparent font-medium rounded-full hover:bg-blue-500/5 hover:border-blue-500 transition-all duration-300";
  
  const handleClick = (e) => {
    if (!isAnchor) return;
    
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;
    
    // Calcular posición con offset
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;
    
    // Animación de scroll
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Efecto visual para destacar la sección
    const highlightEffect = document.createElement('div');
    highlightEffect.style.position = 'fixed';
    highlightEffect.style.top = '0';
    highlightEffect.style.left = '0';
    highlightEffect.style.width = '100%';
    highlightEffect.style.height = '100%';
    highlightEffect.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    highlightEffect.style.zIndex = '999';
    highlightEffect.style.pointerEvents = 'none';
    highlightEffect.style.opacity = '0';
    highlightEffect.style.transition = 'opacity 0.3s ease-in-out';
    
    document.body.appendChild(highlightEffect);
    
    // Animación de aparición y desaparición
    setTimeout(() => {
      highlightEffect.style.opacity = '1';
      setTimeout(() => {
        highlightEffect.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(highlightEffect);
        }, 300);
      }, 500);
    }, 100);
  };
  
  return (
    <motion.a 
      href={href} 
      onClick={handleClick}
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.3,
        type: 'spring',
        stiffness: 500,
        damping: 15
      }}
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

export default AnimatedActionButton; 