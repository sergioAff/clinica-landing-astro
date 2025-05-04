import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

const AnimatedTeamCard = ({ name, title, description, image, socialLinks = {} }) => {
  const { linkedin, twitter, email, website } = socialLinks;
  
  return (
    <motion.div 
      className="bg-gray-800/30 rounded-xl p-4 sm:p-5 shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group h-full flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 15px 20px -5px rgba(59, 130, 246, 0.1), 0 8px 8px -5px rgba(59, 130, 246, 0.04)" }}
    >
      <motion.h3 
        className="text-base sm:text-lg font-semibold text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {name}
      </motion.h3>
      
      <motion.p 
        className="text-blue-400 text-xs sm:text-sm mb-3 sm:mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.p>
      
      <motion.div 
        className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <img 
          src={image} 
          alt={name}
          className="w-full aspect-square object-cover object-center transition-transform duration-300"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.6 }}
        />
      </motion.div>
      
      <motion.p 
        className="text-gray-400 text-xs sm:text-sm mb-3 flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>
      
      <motion.div 
        className="flex space-x-3 mt-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {linkedin && (
          <motion.a 
            href={linkedin} 
            className="text-gray-400 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.15, color: "rgb(0, 119, 181)" }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin size={18} />
          </motion.a>
        )}
        
        {twitter && (
          <motion.a 
            href={twitter} 
            className="text-gray-400 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.15, color: "rgb(29, 161, 242)" }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Twitter</span>
            <Twitter size={18} />
          </motion.a>
        )}
        
        {email && (
          <motion.a 
            href={`mailto:${email}`} 
            className="text-gray-400 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.15, color: "rgb(234, 67, 53)" }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Email</span>
            <Mail size={18} />
          </motion.a>
        )}
        
        {website && (
          <motion.a 
            href={website} 
            className="text-gray-400 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.15, color: "rgb(56, 189, 248)" }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Website</span>
            <ExternalLink size={18} />
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedTeamCard; 