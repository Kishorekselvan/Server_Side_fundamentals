import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ConceptCard({ concept }) {
  return (
    <motion.div 
      className="w-full p-2" // Ensures proper spacing in grid
    >
      <motion.div
        whileHover={{ 
          scale: 1.02,
          y: -3,
          boxShadow: "0 8px 20px rgba(100, 180, 255, 0.2)"
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-xl overflow-hidden border border-opacity-10"
      >
        <Link to={`/concept/${concept.id}`} className="block h-full">
          <div className="h-full p-5 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/70 shadow-md hover:shadow-lg transition-all duration-300">
            
            {/* Card Header with subtle metallic accent */}
            <div className="mb-3 pb-2 border-b border-blue-200/50">
              <h3 className="text-lg font-semibold text-blue-900">
                {concept.title}
              </h3>
              <div className="w-10 h-0.5 mt-1.5 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full"></div>
            </div>
            
            {/* Card Body */}
            <p className="text-blue-800/90 text-sm mb-4 leading-snug">
              {concept.description}
            </p>
            
            {/* Card Footer */}
            <div className="mt-auto">
              <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-200/50 text-blue-700 border border-blue-300/50">
                {concept.category}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default ConceptCard;