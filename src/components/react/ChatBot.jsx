import React, { useState, useRef, useEffect, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, MessageCircle, Bot, CircleHelp, Sparkles, Clock, Calendar } from 'lucide-react';

// Preguntas frecuentes y respuestas
const faqs = [
  {
    id: 'saludo',
    keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'ey', 'hi', 'hello'],
    answer: 'Hola, ¡encantado de saludarte! Soy el asistente virtual de MenteSana. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre nuestros servicios, precios, o cómo agendar una cita.'
  },
  {
    id: 'despedida',
    keywords: ['adiós', 'adios', 'chau', 'hasta luego', 'nos vemos', 'bye', 'ciao', 'gracias', 'muchas gracias'],
    answer: 'Ha sido un placer ayudarte. Si necesitas algo más, no dudes en volver a preguntarme. ¡Que tengas un excelente día! Recuerda que también puedes contactarnos directamente al +598 98018044.'
  },
  {
    id: 'consulta',
    keywords: ['cita', 'consulta', 'reservar', 'agendar', 'pedir', 'solicitar', 'agenda', 'turno', 'hora'],
    answer: 'Puedes solicitar una cita usando nuestro formulario de contacto o llamando al +598 98018044. También puedes reservar directamente en la sección "Solicitar cita" de nuestra web o enviarnos un WhatsApp. Atendemos con prontitud y buscamos el horario que mejor se adapte a tus necesidades.'
  },
  {
    id: 'precio',
    keywords: ['precio', 'costo', 'tarifa', 'vale', 'valor', 'cuanto', 'cuánto', 'pesos', '$', 'dinero', 'cobran'],
    answer: 'Nuestras tarifas oscilan entre 1000 y 2500 pesos uruguayos por sesión, dependiendo del tipo de terapia y duración. Ofrecemos diferentes opciones de pago y trabajamos con varias aseguradoras médicas. La primera consulta tiene un precio especial de evaluación.'
  },
  {
    id: 'duracion',
    keywords: ['duración', 'durar', 'tiempo', 'frecuencia', 'sesión', 'sesiones', 'sesion', 'largo', 'minutos', 'hora'],
    answer: 'Las sesiones tienen una duración estándar de 45-60 minutos. La primera consulta puede extenderse hasta 90 minutos para realizar una evaluación completa. Generalmente recomendamos sesiones semanales al inicio del tratamiento, ajustando la frecuencia según tu evolución.'
  },
  {
    id: 'online',
    keywords: ['online', 'virtual', 'videollamada', 'distancia', 'remoto', 'telemedicina', 'internet', 'web', 'zoom', 'casa'],
    answer: 'Sí, ofrecemos terapia online mediante videollamada segura y confidencial. Este formato ha demostrado ser tan efectivo como la terapia presencial para la mayoría de las condiciones psicológicas. Te enviaremos instrucciones sencillas para conectarte a tu sesión.'
  },
  {
    id: 'especialidad',
    keywords: ['especialidad', 'especialidades', 'tratan', 'tratar', 'tratamiento', 'problemas', 'ansiedad', 'depresión', 'pareja', 'especializan'],
    answer: 'Nuestro equipo está especializado en diversos problemas: ansiedad, depresión, estrés, problemas de pareja, autoestima, traumas, adicciones, trastornos alimentarios y más. Contamos con especialistas en terapia cognitivo-conductual, terapia EMDR y mindfulness. En tu primera consulta evaluaremos tu caso específico.'
  },
  {
    id: 'seguro',
    keywords: ['seguro', 'seguros', 'aseguradora', 'aseguradoras', 'mutual', 'médico', 'cobertura', 'obra social', 'fonasa', 'mutualista'],
    answer: 'Trabajamos con las principales aseguradoras médicas y mutualistas de Uruguay. En tu primera consulta o contacto con nosotros podemos verificar específicamente si tu seguro médico tiene convenio con nuestro centro y los detalles de la cobertura.'
  },
  {
    id: 'ubicacion',
    keywords: ['ubicación', 'ubicacion', 'dirección', 'direccion', 'donde', 'dónde', 'lugar', 'consulta', 'clínica', 'consultorio', 'llegar'],
    answer: 'Nuestro centro está ubicado en Av. Rivera 1234, Montevideo, Uruguay. Es una zona céntrica con fácil acceso en transporte público. Las líneas de ómnibus que pasan cerca son: 103, 106 y 109. También hay buena disponibilidad de estacionamiento en los alrededores si vienes en vehículo particular.'
  },
  {
    id: 'horario',
    keywords: ['horario', 'horarios', 'atención', 'atencion', 'abierto', 'abren', 'cierran', 'tarde', 'mañana', 'disponibilidad', 'calendario'],
    answer: 'Nuestro horario de atención es de lunes a viernes de 9:00 a 20:00h. También ofrecemos algunas sesiones los sábados por la mañana de 9:00 a 14:00h. Nos adaptamos a tu disponibilidad, teniendo opciones tanto en horario laboral como fuera de él.'
  },
  {
    id: 'primera_consulta',
    keywords: ['primera', 'inicial', 'evaluación', 'evaluacion', 'diagnóstico', 'diagnostico', 'comenzar', 'empezar', 'llevar', 'necesito'],
    answer: 'En la primera consulta realizamos una evaluación inicial completa para entender tu situación. No necesitas traer nada especial, solo estar dispuesto a compartir tus inquietudes. Esta sesión es un poco más larga que las regulares ya que nos permite conocerte mejor y diseñar un plan de tratamiento personalizado.'
  },
  {
    id: 'metodos_pago',
    keywords: ['pago', 'pagar', 'efectivo', 'tarjeta', 'transferencia', 'débito', 'debito', 'crédito', 'credito', 'mercadopago', 'prex'],
    answer: 'Aceptamos diversos métodos de pago: efectivo, tarjetas de débito/crédito, transferencia bancaria, MercadoPago y RedPagos. Para tu comodidad, puedes pagar antes o después de cada sesión, o bien optar por un paquete de sesiones con descuento si prefieres.'
  },
  {
    id: 'servicios_generales',
    keywords: ['servicio', 'servicios', 'ofrecen', 'hacen', 'ayudan', 'tratan', 'terapias', 'psicoterapia', 'tipos'],
    answer: 'En MenteSana ofrecemos diversos servicios psicológicos: terapia individual, terapia de pareja, terapia familiar, evaluaciones psicológicas, terapia online, mindfulness y técnicas de relajación, coaching personal y asesoramiento en crisis. Nuestro enfoque es personalizado para cada paciente según sus necesidades específicas.'
  },
  {
    id: 'como_funciona',
    keywords: ['como funciona', 'cómo funciona', 'proceso', 'terapia', 'comenzar', 'empezar', 'inicia', 'primera vez'],
    answer: 'El proceso inicia con una primera consulta de evaluación donde conoceremos tu situación y necesidades. A partir de allí, diseñamos un plan terapéutico personalizado. Las sesiones suelen ser semanales al inicio, con una duración de 45-60 minutos. El tiempo total de terapia depende de cada caso, pero siempre trabajamos en establecer objetivos claros y alcanzables.'
  },
  {
    id: 'enfoque_terapeutico',
    keywords: ['enfoque', 'terapéutico', 'método', 'metodología', 'técnica', 'cognitivo', 'conductual', 'sistémico', 'gestalt'],
    answer: 'Nuestro equipo trabaja con diversos enfoques terapéuticos, principalmente Terapia Cognitivo-Conductual (TCC), Terapia Sistémica, EMDR para traumas, Mindfulness y técnicas de tercera generación. Adaptamos la metodología según las necesidades de cada persona, utilizando enfoques basados en evidencia científica.'
  },
  {
    id: 'equipo',
    keywords: ['equipo', 'psicólogos', 'profesionales', 'especialistas', 'quiénes', 'quienes', 'trabajan', 'staff', 'terapeuta'],
    answer: 'Nuestro equipo está compuesto por psicólogos licenciados con amplia experiencia clínica y especialización en diferentes áreas de la salud mental. Todos nuestros profesionales cuentan con formación continua y están colegiados en la Coordinadora de Psicólogos del Uruguay. Puedes conocer más sobre cada especialista en la sección "Nuestro Equipo" de la web.'
  },
  {
    id: 'covid',
    keywords: ['covid', 'coronavirus', 'pandemia', 'protocolos', 'sanitarios', 'presencial', 'seguridad'],
    answer: 'Mantenemos protocolos de seguridad e higiene en nuestras instalaciones. Para quienes prefieren evitar el contacto presencial o viven lejos, ofrecemos sesiones online con la misma calidad y confidencialidad que las presenciales. Somos flexibles para adaptarnos a tus necesidades y circunstancias.'
  },
  {
    id: 'confidencialidad',
    keywords: ['confidencial', 'privacidad', 'secreto', 'discreción', 'datos', 'información', 'protección', 'comparte'],
    answer: 'La confidencialidad es un pilar fundamental de nuestro trabajo. Toda la información compartida en terapia es estrictamente confidencial y está protegida por el secreto profesional. Solo en casos excepcionales previstos por la ley (riesgo inminente para el paciente u otros) podría romperse esta confidencialidad. Nuestros sistemas digitales también cumplen con estrictos protocolos de seguridad.'
  }
];

// Sugerencias rápidas para mostrar al usuario
const quickSuggestions = [
  { text: "¿Cuáles son los precios?", value: "¿Cuáles son los precios de las consultas?" },
  { text: "Agendar una cita", value: "¿Cómo puedo agendar una cita?" },
  { text: "Horarios disponibles", value: "¿Cuáles son los horarios de atención?" },
  { text: "Terapia online", value: "¿Ofrecen terapia online?" },
  { text: "¿Qué terapias aplican?", value: "¿Qué enfoques terapéuticos utilizan?" },
  { text: "Sobre el equipo", value: "¿Quiénes forman el equipo profesional?" }
];

// Mensaje inicial y de despedida
const initialMessage = {
  text: '👋 ¡Hola! Soy el asistente virtual de MenteSana. Estoy aquí para responder tus preguntas sobre nuestros servicios psicológicos. Puedes preguntarme sobre precios, horarios, cómo agendar una cita o explorar las sugerencias debajo.',
  sender: 'bot',
};

const fallbackMessage = 'Comprendo tu consulta, pero no tengo información específica sobre ese tema en particular. ¿Te gustaría que te ayude con información sobre nuestros servicios, precios o agenda de citas? También puedes contactar directamente con nuestro equipo al +598 98018044.';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
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

  // Mostrar notificación después de 15 segundos si el chat no está abierto
  useEffect(() => {
    if (!isOpen && !showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showNotification]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentMessage.trim()) return;
    
    // Añadir mensaje del usuario
    const userMessage = { text: currentMessage, sender: 'user' };
    setMessages([...messages, userMessage]);
    setCurrentMessage('');
    
    // Simular que el bot está escribiendo
    setIsBotTyping(true);
    
    // Procesamiento del mensaje con tiempo de respuesta natural
    setTimeout(() => {
      const response = findResponse(currentMessage);
      setIsBotTyping(false);
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, Math.random() * 1000 + 800); // Tiempo de respuesta variable entre 800ms y 1800ms
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
    
    // Procesamiento para mensajes que no coinciden exactamente con palabras clave
    // Intentar entender la intención de la pregunta
    if (lowerMessage.includes('qué') || lowerMessage.includes('que') || 
        lowerMessage.includes('como') || lowerMessage.includes('cómo') ||
        lowerMessage.includes('cuál') || lowerMessage.includes('cual') ||
        lowerMessage.includes('quién') || lowerMessage.includes('quien') ||
        lowerMessage.includes('cuando') || lowerMessage.includes('cuándo') ||
        lowerMessage.includes('donde') || lowerMessage.includes('dónde')) {
      
      // Preguntas sobre servicios
      if (lowerMessage.includes('servicio') || lowerMessage.includes('ayuda') || 
          lowerMessage.includes('ofrecen') || lowerMessage.includes('ayudan')) {
        return faqs.find(faq => faq.id === 'servicios_generales').answer;
      }
      
      // Preguntas sobre precio
      if (lowerMessage.includes('cuesta') || lowerMessage.includes('valor') || 
          lowerMessage.includes('precio') || lowerMessage.includes('pago')) {
        return faqs.find(faq => faq.id === 'precio').answer;
      }
      
      // Preguntas sobre el equipo
      if (lowerMessage.includes('psicólogo') || lowerMessage.includes('psicologo') || 
          lowerMessage.includes('terapeuta') || lowerMessage.includes('profesional')) {
        return faqs.find(faq => faq.id === 'equipo').answer;
      }
    }
    
    // Si no hay coincidencias, devolver mensaje predeterminado
    return fallbackMessage;
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
    
    // Si se está cerrando y hay conversación, resetear para la próxima
    if (isOpen && messages.length > 1) {
      // No reseteamos inmediatamente para mantener la conversación si el usuario reabre el chat
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Simular que el usuario escribe y envía el mensaje de sugerencia
    setCurrentMessage(suggestion);
    setTimeout(() => {
      const userMessage = { text: suggestion, sender: 'user' };
      setMessages([...messages, userMessage]);
      
      // Simular que el bot está escribiendo
      setIsBotTyping(true);
      
      setTimeout(() => {
        const response = findResponse(suggestion);
        setIsBotTyping(false);
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      }, Math.random() * 1000 + 800);
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón para abrir/cerrar el chat */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full z-30 w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer relative"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de ayuda"}
      >
        {isOpen ? (
          <X size={24} className="animate-fadeIn" />
        ) : (
          <>
            <MessageCircle size={24} className="animate-pulse" />
            {showNotification && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                1
              </span>
            )}
          </>
        )}
      </button>
      
      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
          >
            {/* Cabecera */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot size={20} className="mr-2" />
                <h3 className="font-medium">Asistente MenteSana</h3>
              </div>
              <button 
                onClick={toggleChat} 
                className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1 cursor-pointer hover:bg-blue-800/50"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {/* Indicador de que el bot está escribiendo */}
              {isBotTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 text-gray-400 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-700 flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Sugerencias rápidas */}
            <div className="p-2 bg-gray-800 border-t border-gray-700 flex gap-2 overflow-x-auto scrollbar-none">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.value)}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs py-1 px-3 rounded-full whitespace-nowrap transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center gap-1"
                >
                  {index === 0 && <Sparkles size={12} />}
                  {index === 1 && <Calendar size={12} />}
                  {index === 2 && <Clock size={12} />}
                  {index === 3 && <CircleHelp size={12} />}
                  {index === 4 && <CircleHelp size={12} />}
                  {index === 5 && <CircleHelp size={12} />}
                  {suggestion.text}
                </button>
              ))}
            </div>
            
            {/* Formulario de entrada */}
            <form onSubmit={handleSubmit} className="p-3 bg-gray-800 border-t border-gray-700 flex">
              <input
                ref={inputRef}
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-gray-700 text-white rounded-l-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                aria-label="Mensaje"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
                disabled={!currentMessage.trim()}
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