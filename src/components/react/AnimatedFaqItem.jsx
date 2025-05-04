import React, { useState } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const AnimatedFaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = `faq-${question.replace(/\s+/g, '-').toLowerCase()}`;
  const headingId = `${id}-heading`;
  const contentId = `${id}-content`;

  return (
    <LazyMotion features={domAnimation}>
      <motion.div 
        className="glassmorphism rounded-xl overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 20 
        }}
        whileHover={{ 
          boxShadow: isOpen 
            ? "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }}
      >
        {/* Efecto de borde brillante */}
        <div className={`absolute inset-0 rounded-xl border border-blue-500/0 transition-all duration-700 ${isOpen ? "border-blue-500/30 shadow-[inset_0px_0px_10px_rgba(59,130,246,0.1)]" : "group-hover:border-blue-500/10"}`}></div>
        
        {/* Fondo con gradiente sutil que cambia cuando se abre */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700 rounded-xl ${
            isOpen ? "from-blue-600/5 to-purple-600/5 opacity-100" : "from-blue-600/0 to-transparent group-hover:opacity-30"
          }`}
        ></div>
        
        <motion.button 
          className="flex justify-between items-center cursor-pointer w-full text-left px-6 py-4 focus:outline-none relative z-10 group"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={headingId}
          whileTap={{ scale: 0.99 }}
        >
          <h3 className={`text-xl font-semibold transition-colors duration-300 ${isOpen ? "text-blue-400" : "text-gray-100 group-hover:text-blue-300"}`}>
            {question}
          </h3>
          
          <motion.div
            animate={{ 
              rotate: isOpen ? 180 : 0,
              backgroundColor: isOpen ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0)",
              scale: isOpen ? 1.1 : 1
            }}
            transition={{ duration: 0.4 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen ? "bg-blue-500/10 text-blue-400" : "text-blue-400 group-hover:bg-blue-500/5"
            }`}
            aria-hidden="true"
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: { 
                  height: { duration: 0.4 }, 
                  opacity: { duration: 0.3, delay: 0.1 } 
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: { 
                  height: { duration: 0.3 }, 
                  opacity: { duration: 0.2 } 
                }
              }}
              className="overflow-hidden"
              id={contentId}
              role="region"
              aria-labelledby={headingId}
            >
              <motion.div 
                className="px-6 pb-5 relative"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {/* Línea divisoria con degradado */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mb-4"></div>
                
                <p className="text-gray-300 text-base leading-relaxed">{answer}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LazyMotion>
  );
};

// Estilo para glassmorphism
const styles = `
  .glassmorphism {
    background: rgba(17, 24, 39, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.5s ease-in-out;
  }
`;

// Inyectar estilos en el documento
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}

// Performance optimization
export default React.memo(AnimatedFaqItem); 