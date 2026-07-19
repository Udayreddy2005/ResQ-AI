import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const aiAnalysis = location.state?.assessment;
  const patient = location.state?.patient;
  const description = location.state?.description;

  if (!aiAnalysis) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        No Assessment Data Found
      </div>
    );
  }

  const severityStyles = {
    Critical: {
      bg: "bg-red-500/10 border-red-500/40",
      badge: "bg-red-500/20 text-red-400",
      text: "text-red-400",
      bar: "bg-red-500",
    },
    Moderate: {
      bg: "bg-yellow-500/10 border-yellow-500/40",
      badge: "bg-yellow-500/20 text-yellow-400",
      text: "text-yellow-400",
      bar: "bg-yellow-500",
    },
    Low: {
      bg: "bg-emerald-500/10 border-emerald-500/40",
      badge: "bg-emerald-500/20 text-emerald-400",
      text: "text-emerald-400",
      bar: "bg-emerald-500",
    },
  };

  const style =
    severityStyles[aiAnalysis.severity] || severityStyles.Moderate;

  const openMaps = () => {
    if (
      !aiAnalysis.hospital ||
      aiAnalysis.hospital.latitude == null ||
      aiAnalysis.hospital.longitude == null
    ) {
      alert("Hospital location unavailable");
      return;
    }

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${aiAnalysis.hospital.latitude},${aiAnalysis.hospital.longitude}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-10">

  <div className="max-w-7xl mx-auto">

    <button
      onClick={() => navigate("/assessment")}
      className="mb-6 text-neutral-400 hover:text-white"
    >
      ← Back
    </button>

    {/* Severity Card */}

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-8 ${style.bg}`}
    >

      <span className={`px-4 py-2 rounded-full text-sm font-bold ${style.badge}`}>
        {aiAnalysis.severity}
      </span>

      <h1 className="text-4xl font-black mt-5">
        🚨 Emergency Analysis
      </h1>

      <p className="mt-3 text-neutral-300 text-lg">
        {aiAnalysis.emergency_type}
      </p>

      <div className="mt-8">

        <div className="flex justify-between text-sm mb-2">

          <span>AI Confidence</span>

          <span>{aiAnalysis.confidence}%</span>

        </div>

        <div className="w-full h-3 rounded-full bg-neutral-800 overflow-hidden">

          <div
            className={`h-full ${style.bar}`}
            style={{
              width: `${aiAnalysis.confidence}%`
            }}
          />

        </div>

      </div>

    </motion.div>


    <div className="grid lg:grid-cols-2 gap-10 mt-10">

      {/* First Aid */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl hover:border-red-500/30 hover:scale-[1.02] transition-all duration-300"
      >

        <h2 className="text-2xl font-bold mb-5">

          🩹 First Aid Steps

        </h2>

        <div className="space-y-4">

          {aiAnalysis.first_aid.map((step, index) => (

            <div
              key={index}
              className="flex gap-4 bg-neutral-950 rounded-xl p-4"
            >

              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold">

                {index + 1}

              </div>

              <p className="text-neutral-300">

                {step}

              </p>

            </div>

          ))}

        </div>

      </motion.div>


      {/* Hospital */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl hover:border-red-500/30 hover:scale-[1.02] transition-all duration-300"
      >

        <h2 className="text-2xl font-bold mb-5">

          🏥 Recommended Hospital

        </h2>

        <div className="space-y-4">

          <div>

            <h3 className="text-xl font-bold">

              {aiAnalysis.hospital.name}

            </h3>

            <p className="text-neutral-400">

              {aiAnalysis.hospital.address}

            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <div className="text-xs text-neutral-500">

                Distance

              </div>

              <div className="font-bold">

                {aiAnalysis.hospital.distance}

              </div>

            </div>

            <div>

              <div className="text-xs text-neutral-500">

                Hospital Type

              </div>

              <div className="font-bold">

                {aiAnalysis.hospital_type}

              </div>

            </div>

          </div>

          <button

            onClick={openMaps}

            className="w-full bg-red-600 hover:bg-red-500 rounded-xl py-4 font-bold"

          >

            🗺 Navigate using Google Maps

          </button>
          <a
  href="tel:108"
  className="w-full mt-3 flex items-center justify-center rounded-xl bg-green-600 hover:bg-green-500 py-4 font-bold text-white"
>
  📞 Call 108 Ambulance
</a>

        </div>

      </motion.div>

    </div>
        <div className="grid lg:grid-cols-2 gap-10 mt-10">

      {/* Patient Details */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl hover:border-red-500/30 hover:scale-[1.02] transition-all duration-300"
      >

        <h2 className="text-2xl font-bold mb-5">

          👤 Patient Details

        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-neutral-400">Name</span>
            <span>{patient?.name || "Anonymous"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-400">Age</span>
            <span>{patient?.age}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-400">Gender</span>
            <span>{patient?.gender}</span>
          </div>

        </div>

      </motion.div>


      {/* Emergency Description */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl hover:border-red-500/30 hover:scale-[1.02] transition-all duration-300"
      >

        <h2 className="text-2xl font-bold mb-5">

          📝 Emergency Description

        </h2>

        <div className="bg-neutral-950 rounded-xl p-4">

          <p className="text-neutral-300 whitespace-pre-wrap">

            {description}

          </p>

        </div>

      </motion.div>

    </div>


    {/* Download Button */}

    <div className="mt-10">

      <button

        onClick={() => window.print()}

        className="w-full bg-white text-black rounded-xl py-4 font-bold hover:bg-neutral-200 transition"

      >

        📄 Download / Print Emergency Report

      </button>

    </div>

  </div>

</main>

  );

}