import React, { memo } from 'react';
import { motion, LazyMotion, domAnimation, useInView } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const AnimatedServiceCard = memo(({ icon, title, description, features, buttonText, buttonLink }) => {
  // Obtener el componente de Lucide basado en el nombre del icono
  const IconComponent = LucideIcons[icon] || (() => <span className="text-xl sm:text-2xl">{icon}</span>);
  
  return (
    <LazyMotion features={domAnimation}>
      <motion.div 
        className="glassmorphism rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-xl border border-white/5 dark:border-gray-700/30 hover:border-blue-500/30 transition-all duration-500 hover:shadow-blue-500/10 group h-full flex flex-col relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 20,
          mass: 1
        }}
        whileHover={{ y: -5 }}
        role="article"
      >
        {/* Efecto de fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Efecto de luz en hover */}
        <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 rounded-xl blur-md transition-opacity duration-700 pointer-events-none" />
        
        {/* Contenido principal */}
        <div className="relative z-10">
          <motion.div 
            className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-hidden="true"
          >
            <IconComponent size={24} className="text-white" aria-hidden="true" />
          </motion.div>
          
          <motion.h3 
            className="text-xl sm:text-2xl font-bold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>
          
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-5 font-light">{description}</p>
          
          {features && features.length > 0 && (
            <ul className="text-gray-400 text-sm space-y-2 mb-6 mt-auto" aria-label={`Características de ${title}`}>
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  <span className="text-blue-400 mr-2 flex-shrink-0 mt-1" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="mt-auto pt-4 relative z-10">
          <motion.a 
            href={buttonLink} 
            className="inline-flex items-center justify-center w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden relative"
            whileHover={{ 
              boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1)" 
            }}
            whileTap={{ scale: 0.98 }}
            aria-label={`${buttonText} para ${title}`}
          >
            {/* Efecto de brillo al hover */}
            <span className="absolute inset-0 w-0 bg-white opacity-30 h-full transform skew-x-12 group-hover:animate-shine"></span>
            
            <span className="mr-2">{buttonText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </LazyMotion>
  );
});

// Estilo para glassmorphism
const styles = `
  .glassmorphism {
    background: rgba(17, 24, 39, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  @keyframes shine {
    from {
      transform: translateX(-100%) skew(-15deg);
      left: -30%;
      width: 30%;
    }
    to {
      transform: translateX(200%) skew(-15deg);
      left: 100%;
      width: 30%;
    }
  }
  
  .group-hover\\:animate-shine {
    animation: shine 1.5s ease-in-out infinite;
  }
`;

// Inyectar estilos en el documento
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}

// Agregar displayName para depuración
AnimatedServiceCard.displayName = 'AnimatedServiceCard';

export default AnimatedServiceCard; 