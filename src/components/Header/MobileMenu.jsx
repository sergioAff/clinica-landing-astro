import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navItems = [
  { label: "Inicio", id: "home" },
  { label: "Servicios", id: "services" },
  { label: "Equipo", id: "team" },
  { label: "Testimonios", id: "testimonials" },
  { label: "Blog", id: "blog" },
  { label: "FAQ", id: "faq" },
  { label: "Contacto", id: "contact" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar el menú si el clic es fuera del menú y fuera del botón
      if (isOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) && 
          buttonRef.current && 
          !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    // Sólo agregar el listener cuando el menú esté abierto
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;
      
      // Close on escape
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
      
      // Trap focus within the menu
      if (event.key === 'Tab') {
        if (!menuRef.current) return;
        
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Shift + Tab on first element? Go to last element
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        } 
        // Tab on last element? Go to first element
        else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Focus first element when menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector('a, button');
      firstFocusable?.focus();
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <motion.button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-lg bg-white/30 backdrop-blur-md hover:bg-white/40 dark:bg-gray-800/70 dark:hover:bg-gray-700/80 transition-colors shadow-md"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X size={24} className="text-white" aria-hidden="true" />
        ) : (
          <Menu size={24} className="text-white" aria-hidden="true" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-menu-backdrop"
              aria-hidden="true"
            />
            
            <motion.div
              ref={menuRef}
              id="mobile-navigation"
              role="navigation"
              aria-label="Menú de navegación móvil"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-4 z-50 bg-white/90 dark:bg-gray-800/95 backdrop-blur-md shadow-lg rounded-lg w-64 py-4 px-4 border border-white/20 dark:border-gray-700/30"
            >
              <motion.nav>
                <ul className="flex flex-col gap-3" role="menu">
                  {navItems.map((item) => (
                    <motion.li 
                      key={item.id}
                      role="menuitem"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-b border-gray-100/50 dark:border-gray-700/50 last:border-b-0"
                    >
                      <a 
                        href={`#${item.id}`}
                        className="block py-3 text-gray-800 dark:text-white font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.a
                    href="#contact"
                    role="menuitem"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="button-main w-full flex items-center justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone size={16} aria-hidden="true" />
                    <span>Contáctanos</span>
                  </motion.a>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 