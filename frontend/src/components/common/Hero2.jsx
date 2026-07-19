import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();


  // Animation configuration presets for cleaner JSX
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-neutral-950 text-neutral-100">
      
      {/* Background radial gradients for futuristic ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-red-900/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-900/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0a0a_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Context and Copy */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col justify-center text-left"
        >
          {/* AI Badge */}
          <motion.div variants={itemVariants} className="self-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              AI-Powered Emergency Platform
            </span>
          </motion.div>

          {/* Core Title */}
          <motion.h1 
            variants={itemVariants} 
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            AI-Powered <br />
            <span className="bg-gradient-to-r from-neutral-50 via-neutral-100 to-red-500 bg-clip-text text-transparent">
              Emergency Triage
            </span> <br />
            & First Response
          </motion.h1>

          {/* Subtitle describing Core Features */}
          <motion.p 
            variants={itemVariants} 
            className="mt-6 text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed"
          >
            Analyze critical emergencies in real-time using text, image, or voice input. Our localized intelligent system predicts severity levels, provides immediate first-aid instructions, and guides you to the nearest, most suitable specialized hospital.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants} 
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
  onClick={() => {
    console.log("Button clicked");
    navigate("/assessment");
  }}
  className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
>
  Start Assessment
</button>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-neutral-700"
            >
              <span>▶</span> Watch Demo
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Futuristic Interactive Dashboard Panel */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 60, damping: 20, delay: 0.3 } }
          }}
          className="lg:col-span-6 relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center"
        >
          {/* Ambient background rings behind dashboard */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[85%] h-[85%] rounded-full border border-neutral-900 animate-[spin_120s_linear_infinite]" />
            <div className="absolute w-[65%] h-[65%] rounded-full border border-neutral-900/60 border-dashed animate-[spin_60s_linear_infinite_reverse]" />
          </div>

          {/* Dashboard Container Grid */}
          <div className="relative w-full h-full grid grid-cols-2 gap-4 p-4">

            {/* Card 1: AI Severity Prediction */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-neutral-950/45 backdrop-blur-md border border-neutral-800/80 p-5 rounded-2xl flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-red-400 tracking-wider uppercase">AI Triage</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 font-bold uppercase tracking-wider animate-pulse">Critical</span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-neutral-100 tracking-tight">CRITICAL</div>
                <p className="text-[11px] text-neutral-400 mt-1 leading-normal">Acute respiratory distress with signs of partial airway obstruction.</p>
              </div>
              <div className="mt-4 w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-amber-500 h-1.5 rounded-full" style={{ width: '92%' }} />
              </div>
            </motion.div>

            {/* Card 2: First Aid Guidance */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-neutral-950/45 backdrop-blur-md border border-neutral-800/80 p-5 rounded-2xl flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  ✚
                </div>
                <span className="text-xs font-semibold text-neutral-300">First Aid</span>
              </div>
              <div className="mt-4 flex-1 flex flex-col justify-end">
                <div className="text-sm font-semibold text-neutral-200">CPR Guidance Active</div>
                <ul className="mt-2 space-y-1.5 text-[11px] text-neutral-400">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" /> Push hard & fast at 100-120 bpm.
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" /> Keep arms straight, lock elbows.
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 3: Nearest Suitable Hospital */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-neutral-950/45 backdrop-blur-md border border-neutral-800/80 p-5 rounded-2xl flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  🏥
                </div>
                <span className="text-xs font-semibold text-neutral-300">Recommended Care</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-bold text-neutral-200">Metro Trauma Center</div>
                <p className="text-[11px] text-neutral-400 mt-1 leading-normal">Equipped with pediatric ICU & active cardiac suite.</p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>2.4 km away • Fully Equipped</span>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Live Location Detection */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-neutral-950/45 backdrop-blur-md border border-neutral-800/80 p-5 rounded-2xl flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-300">Live GPS</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
              </div>
              <div className="mt-4 flex-1 flex flex-col justify-between">
                {/* Simulated Radar / Map Vector element inside component */}
                <div className="relative w-full h-16 rounded-lg bg-neutral-900/80 overflow-hidden flex items-center justify-center border border-neutral-800/50">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
                  <div className="absolute w-8 h-8 rounded-full border border-emerald-500/20 animate-ping" />
                  <div className="absolute w-12 h-12 rounded-full border border-emerald-500/10 animate-pulse" />
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 z-10">
                    Locating User...
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 text-center mt-2 font-mono truncate">
                  LAT: 17.4645 | LON: 80.7011
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}