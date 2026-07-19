import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeEmergency } from "../services/api";
import LoadingScreen from "../components/LoadingScreen";
export default function Assessment() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  
  // Grab selected category from previous step or default
  const initialCategory = routerLocation.state?.category || 'General';

  // State Management
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [inputMethod, setInputMethod] = useState('text'); // default to text
  const [textDescription, setTextDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.error(error);
      alert("Location permission denied.");
    }
  );
}, []);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    // Validation
    if (!patientData.age || !patientData.gender) {
      setValidationError('Please fill in both Age and Gender before proceeding.');
      return;
    }

    if (inputMethod === 'text' && !textDescription.trim()) {
      setValidationError('Please provide a description of the emergency.');
      return;
    }

    if (inputMethod === 'image' && !selectedImage) {
      setValidationError('Please upload an image of the emergency/injury.');
      return;
    }

    // Mock redirection to Results page with full payload
    try {

    setLoading(true);

    const result = await analyzeEmergency({
    category: initialCategory,
    age: Number(patientData.age),
    gender: patientData.gender,
    description: textDescription,
    latitude: location?.latitude,
    longitude: location?.longitude,
});
console.log("RESULT FROM BACKEND:", result);
  setLoading(false);

navigate("/results", {
    state: {
      patient: patientData,
      assessment: result,
      description: textDescription,
    },
  });

} catch (error) {

    setLoading(false);

  console.error(error);

  alert("Unable to analyze emergency.");

}
  };

  // Animation configurations
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
<>
    {loading && <LoadingScreen />}
    <main className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-red-950/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-neutral-900/40 blur-[150px]" />
      </div>

      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-3xl mx-auto z-10"
      >
        {/* Header Indicator */}
        <div className="mb-8 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 shadow-sm">
            <span>🚨</span> Active Case: {initialCategory}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Triage & Assessment
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Provide the required information to configure the ResQ AI analysis model.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-6">
          
          {/* Section 1: Patient Information */}
          <section className="bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">
            <h2 className="text-lg font-bold text-neutral-200 mb-4 flex items-center gap-2">
              <span className="text-neutral-400">01.</span> Patient Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Full Name (Optional)</label>
                <input
                  type="text"
                  name="name"
                  value={patientData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Age (Required) *</label>
                <input
                  type="number"
                  name="age"
                  required
                  value={patientData.age}
                  onChange={handleInputChange}
                  placeholder="e.g. 34"
                  min="0"
                  max="125"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Gender (Required) *</label>
                <select
                  name="gender"
                  required
                  value={patientData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-300 focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Non-binary</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Choose Input Method */}
          <section className="bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">
            <h2 className="text-lg font-bold text-neutral-200 mb-4 flex items-center gap-2">
              <span className="text-neutral-400">02.</span> Choose Input Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'text', label: 'Describe Emergency', icon: '⌨' },
                { id: 'image', label: 'Upload Image', icon: '📷' },
                { id: 'voice', label: 'Record Voice', icon: '🎤' }
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => { setInputMethod(method.id); setValidationError(''); }}
                  className={`flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                    inputMethod === method.id
                      ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.05)]'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-2xl mb-2">{method.icon}</span>
                  <span className={`text-xs font-semibold tracking-wide ${inputMethod === method.id ? 'text-red-400' : 'text-neutral-400'}`}>
                    {method.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Section 3: Dynamic Input Area */}
          <section className="bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl min-h-[200px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {inputMethod === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Describe the Situation</label>
                  <textarea
                    rows="5"
                    value={textDescription}
                    onChange={(e) => { setTextDescription(e.target.value); if (validationError) setValidationError(''); }}
                    placeholder="Provide critical observations, symptoms, or what occurred. E.g. Patient fell down stairs, has laceration on left forearm, conscious but bleeding heavily..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors resize-none leading-relaxed"
                  />
                </motion.div>
              )}

              {inputMethod === 'image' && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-neutral-800 hover:border-neutral-700 rounded-xl p-6 bg-neutral-950 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {selectedImage ? (
                        <div className="relative max-w-xs rounded-lg overflow-hidden border border-neutral-800">
                          <img src={selectedImage} alt="Uploaded preview" className="max-h-48 object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-white">Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="text-3xl mb-2">📤</span>
                          <p className="text-sm font-semibold text-neutral-300">Click to Upload Emergency Media</p>
                          <p className="text-xs text-neutral-500 mt-1">Supports PNG, JPG, or WEBP formats</p>
                        </>
                      )}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </motion.div>
              )}

              {inputMethod === 'voice' && (
                <motion.div
                  key="voice"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center py-6"
                >
                  <button
                    type="button"
                    onClick={() => setIsRecording(!isRecording)}
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.5)] cursor-pointer ${
                      isRecording 
                        ? 'bg-red-600 border-red-500 text-white animate-pulse' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {isRecording && (
                      <span className="absolute inset-0 rounded-full border-4 border-red-500/30 animate-ping" />
                    )}
                    <span className="text-3xl">{isRecording ? '⏹' : '🎤'}</span>
                  </button>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {isRecording ? 'Recording Active • Click to Stop' : 'Tap to Start Audio Dispatch'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Validation Banner */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-950/20 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm flex items-center gap-2.5"
              >
                <span>⚠️</span> {validationError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 4: Analyze Emergency CTA */}
          <button
  type="submit"
  disabled={loading}
  className="w-full py-4 rounded-xl font-bold bg-red-600 hover:bg-red-500 disabled:bg-neutral-700 text-white shadow-[0_0_25px_rgba(220,38,38,0.2)] hover:shadow-[0_0_35px_rgba(220,38,38,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-base cursor-pointer"
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Analyzing Emergency...
    </>
  ) : (
    <>
      <span>🚨</span>
      Analyze Emergency Status
    </>
  )}
</button>

                </form>
      </motion.div>
    </main>
  </>
  );
}