import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const AnimatedTestimonialCard = ({ content, authorName, authorTitle, authorImage, rating = 5 }) => {
  return (
    <motion.div 
      className="bg-gray-800/30 rounded-xl p-5 sm:p-6 md:p-7 shadow-lg border border-gray-700/50 relative h-full flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 0.5)"
      }}
    >
      {/* Comillas decorativas */}
      <motion.div 
        className="absolute -top-3 -left-3 text-blue-400 opacity-30"
        initial={{ rotate: -15, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Quote size={36} />
      </motion.div>
      
      <div className="relative z-10 flex flex-col h-full">
        <motion.div 
          className="flex items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex text-yellow-400">
            {[...Array(rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
              >
                <Star size={16} fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.p 
          className="text-gray-300 mb-4 sm:mb-6 italic text-sm sm:text-base flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          "{content}"
        </motion.p>
        
        <motion.div 
          className="flex items-center mt-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 overflow-hidden mr-3 sm:mr-4"
            whileHover={{ scale: 1.08 }}
          >
            <img src={authorImage} alt={authorName} className="w-full h-full object-cover" />
          </motion.div>
          <div>
            <h4 className="text-gray-100 font-semibold text-sm sm:text-base">{authorName}</h4>
            <p className="text-gray-400 text-xs sm:text-sm">{authorTitle}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedTestimonialCard; 