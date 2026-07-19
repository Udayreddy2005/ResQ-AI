import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const fade = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const card = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="min-h-screen bg-neutral-950 text-white flex items-center">
      <div className="max-w-7xl mx-auto w-full px-8 grid lg:grid-cols-2 gap-12 items-center">

        <motion.div initial="hidden" animate="show" variants={fade}>
          <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 font-bold">
            🚨 ResQ AI
          </span>

          <h1 className="mt-6 text-6xl font-black leading-tight">
            AI Powered<br/>Emergency
            <span className="text-red-500"> Triage</span>
          </h1>

          <p className="mt-6 text-neutral-400 text-lg">
            Analyze emergencies, get instant first aid, find nearby hospitals and navigate immediately.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate('/assessment')}
              className="bg-red-600 hover:bg-red-500 px-8 py-4 rounded-xl font-bold">
              🚨 Start Assessment
            </button>

            <button className="border border-neutral-700 px-8 py-4 rounded-xl hover:bg-neutral-900">
              ▶ Watch Demo
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">

          <motion.div variants={card} initial="hidden" animate="show" className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <h3 className="font-bold text-red-400">AI TRIAGE</h3>
            <div className="text-5xl font-black mt-4">98%</div>
            <p className="text-neutral-400 mt-2">Confidence</p>
          </motion.div>

          <motion.div variants={card} initial="hidden" animate="show" className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <h3 className="font-bold">🩹 First Aid</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>✔ Stay Calm</li>
              <li>✔ Call Emergency</li>
              <li>✔ Follow AI Guidance</li>
            </ul>
          </motion.div>

          <motion.div variants={card} initial="hidden" animate="show" className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <h3 className="font-bold">🏥 Hospital</h3>
            <p className="mt-3">Nearest Emergency Hospital</p>
            <p className="text-neutral-400">Live Recommendation</p>
          </motion.div>

          <motion.div variants={card} initial="hidden" animate="show" className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <h3 className="font-bold">📍 GPS</h3>
            <div className="mt-6 w-16 h-16 mx-auto rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-center mt-4 text-neutral-400">Locating...</p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
