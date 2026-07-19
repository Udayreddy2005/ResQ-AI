import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EmergencyCategories() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Road Accident', icon: '🚗', color: 'from-blue-500/20 to-cyan-500/5', border: 'hover:border-blue-500/40', shadow: 'hover:shadow-blue-500/10' },
    { name: 'Heart Attack', icon: '❤️', color: 'from-red-500/20 to-rose-500/5', border: 'hover:border-red-500/40', shadow: 'hover:shadow-red-500/10' },
    { name: 'Stroke', icon: '🧠', color: 'from-purple-500/20 to-indigo-500/5', border: 'hover:border-purple-500/40', shadow: 'hover:shadow-purple-500/10' },
    { name: 'Burn Injury', icon: '🔥', color: 'from-orange-500/20 to-amber-500/5', border: 'hover:border-orange-500/40', shadow: 'hover:shadow-orange-500/10' },
    { name: 'Snake Bite', icon: '🐍', color: 'from-emerald-500/20 to-green-500/5', border: 'hover:border-emerald-500/40', shadow: 'hover:shadow-emerald-500/10' },
    { name: 'Poisoning', icon: '☠', color: 'from-yellow-500/20 to-lime-500/5', border: 'hover:border-yellow-500/40', shadow: 'hover:shadow-yellow-500/10' },
    { name: 'Severe Bleeding', icon: '🩸', color: 'from-red-600/20 to-rose-700/5', border: 'hover:border-red-600/40', shadow: 'hover:shadow-red-600/10' },
    { name: 'Natural Disaster', icon: '🌪', color: 'from-sky-500/20 to-slate-500/5', border: 'hover:border-sky-500/40', shadow: 'hover:shadow-sky-500/10' },
  ];

  const handleCategorySelect = (categoryName) => {
    navigate('/assessment', { state: { category: categoryName } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <section
        id="features"
        className="relative py-24 bg-neutral-950 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-950/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-red-500 uppercase px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
            Immediate Response Required
          </span>
          <h2 className="mt-4 text-5xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-100">
            Choose the Emergency Type
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Select the emergency category to start AI assessment.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              variants={itemVariants}
              whileHover={{
  scale: 1.05,
  y: -8,
  transition: { duration: 0.2 }
}}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect(cat.name)}
              className={`group flex items-center gap-4 p-7 rounded-2xl text-left bg-gradient-to-br ${cat.color} border border-neutral-800/80 backdrop-blur-md transition-all duration-300 ${cat.border} ${cat.shadow} cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50`}
            >
              {/* Icon Container with individual color aura */}
              <div className="w-12 h-12 flex items-center justify-center text-3xl rounded-xl bg-neutral-900/60 border border-neutral-800 group-hover:bg-neutral-900/90 group-hover:scale-110 transition-all duration-300">
                {cat.icon}
              </div>

              {/* Title Context */}
              <div className="flex-1 min-w-0">
                <span className="block text-xl font-bold text-neutral-200 group-hover:text-neutral-50 transition-colors duration-300 truncate">
                  {cat.name}
                </span>
                <span className="block text-[11px] text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300 font-medium tracking-wide uppercase mt-0.5">
                  Begin AI Assessment →
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}