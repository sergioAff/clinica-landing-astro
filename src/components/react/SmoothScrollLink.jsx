import React from 'react';
import { motion } from 'framer-motion';

const SmoothScrollLink = ({ 
  href, 
  children, 
  className = "", 
  activeClass = "text-blue-400",
  duration = 0.8,
  offset = -100, // Ajustar según el tamaño del header
  'aria-current': ariaCurrent,
  ...restProps
}) => {
  // Detectar si el enlace actual está activo
  const [isActive, setIsActive] = React.useState(false);
  
  React.useEffect(() => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;
    
    const checkIfActive = () => {
      const scrollPos = window.scrollY;
      const targetPosition = targetElement.offsetTop + offset;
      const targetHeight = targetElement.offsetHeight;
      
      // Determinar si la sección está en el viewport
      setIsActive(
        scrollPos >= targetPosition && 
        scrollPos < targetPosition + targetHeight
      );
    };
    
    // Verificar al cargar y al hacer scroll
    checkIfActive();
    window.addEventListener('scroll', checkIfActive);
    
    return () => {
      window.removeEventListener('scroll', checkIfActive);
    };
  }, [href, offset]);
  
  const handleClick = (e) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;
    
    // Animación avanzada con Framer Motion
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Resaltar visualmente la sección de destino
    targetElement.setAttribute('data-highlighted', 'true');
    setTimeout(() => {
      targetElement.removeAttribute('data-highlighted');
    }, 2000);
  };
  
  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClass : ''}`}
      aria-current={ariaCurrent || (isActive ? 'page' : undefined)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      {...restProps}
    >
      {children}
    </motion.a>
  );
};

export default SmoothScrollLink; 