import React, { useState, useRef, useEffect, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, MessageCircle } from 'lucide-react';

// Preguntas frecuentes y respuestas
const faqs = [
  {
    id: 'consulta',
    keywords: ['cita', 'consulta', 'reservar', 'agendar', 'pedir', 'solicitar'],
    answer: 'Puedes solicitar una cita usando nuestro formulario de contacto o llamando al +34 123 456 789. También puedes hacerlo directamente en la sección "Solicitar cita" de nuestra web.',
  },
  {
    id: 'precio',
    keywords: ['precio', 'costo', 'tarifa', 'vale', 'valor', 'cuanto', 'cuánto', 'euros', '€'],
    answer: 'Nuestras tarifas son: Primera sesión: 80€. Sesiones regulares: 70€. Terapia de pareja: 90€. Terapia infantil: 75€. Aceptamos diferentes formas de pago y trabajamos con algunas aseguradoras.',
  },
  {
    id: 'duracion',
    keywords: ['duración', 'durar', 'tiempo', 'frecuencia', 'sesión', 'sesiones', 'sesion'],
    answer: 'Las sesiones tienen una duración aproximada de 45-60 minutos. La primera consulta puede durar hasta 90 minutos para realizar una evaluación completa. La frecuencia recomendada inicialmente es semanal.',
  },
  {
    id: 'online',
    keywords: ['online', 'virtual', 'videollamada', 'distancia', 'remoto', 'telemedicina', 'internet', 'web'],
    answer: 'Sí, ofrecemos terapia online mediante videollamada. La terapia online ha demostrado ser igual de efectiva que la presencial para la mayoría de las condiciones.',
  },
  {
    id: 'especialidad',
    keywords: ['especialidad', 'especialidades', 'tratan', 'tratar', 'tratamiento', 'problemas', 'ansiedad', 'depresión', 'pareja'],
    answer: 'Tratamos diversos problemas: ansiedad, depresión, estrés, problemas de pareja, autoestima, traumas, adicciones, etc. En tu primera consulta evaluaremos tu caso particular.',
  },
  {
    id: 'seguro',
    keywords: ['seguro', 'seguros', 'aseguradora', 'aseguradoras', 'mutua', 'médico', 'cobertura'],
    answer: 'Trabajamos con las principales aseguradoras médicas. Puedes consultarnos si tu seguro está entre nuestros colaboradores contactando con nosotros.',
  },
  {
    id: 'ubicacion',
    keywords: ['ubicación', 'ubicacion', 'dirección', 'direccion', 'donde', 'dónde', 'lugar', 'consulta', 'clínica'],
    answer: 'Estamos ubicados en Calle Principal, 123, Madrid. Cerca de la estación de metro "Plaza de España" y con fácil acceso en transporte público.',
  },
  {
    id: 'horario',
    keywords: ['horario', 'horarios', 'atención', 'atencion', 'abierto', 'abren', 'cierran'],
    answer: 'Nuestro horario de atención es de lunes a viernes de 9:00 a 20:00h. También ofrecemos algunas sesiones en horario de mañana los sábados.',
  },
];

// Mensaje inicial y de despedida
const initialMessage = {
  text: 'Hola, soy el asistente virtual de MenteSana. ¿En qué puedo ayudarte?',
  sender: 'bot',
};

const fallbackMessage = 'Lo siento, no tengo información específica sobre eso. ¿Puedo ayudarte con algo más o prefieres contactar directamente con nuestro equipo?';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentMessage.trim()) return;
    
    // Añadir mensaje del usuario
    const userMessage = { text: currentMessage, sender: 'user' };
    setMessages([...messages, userMessage]);
    setCurrentMessage('');
    
    // Procesamiento del mensaje (simple coincidencia de palabras clave)
    setTimeout(() => {
      const response = findResponse(currentMessage);
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 500);
  };

  const findResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Buscar coincidencias en las palabras clave
    for (const faq of faqs) {
      for (const keyword of faq.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          return faq.answer;
        }
      }
    }
    
    // Si no hay coincidencias, devolver mensaje predeterminado
    return fallbackMessage;
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Si se está cerrando y hay conversación, resetear para la próxima
    if (isOpen && messages.length > 1) {
      setMessages([initialMessage]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón para abrir/cerrar el chat */}
      <button
        onClick={toggleChat}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de ayuda"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden flex flex-col"
          >
            {/* Cabecera */}
            <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle size={20} className="mr-2" />
                <h3 className="font-medium">Chat de Ayuda</h3>
              </div>
              <button 
                onClick={toggleChat} 
                className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full cursor-pointer"
                aria-label="Cerrar chat"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-700 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Formulario de entrada */}
            <form onSubmit={handleSubmit} className="p-3 bg-gray-800 border-t border-gray-700 flex">
              <input
                ref={inputRef}
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-gray-700 text-white rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Mensaje"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                aria-label="Enviar mensaje"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ChatBot); 