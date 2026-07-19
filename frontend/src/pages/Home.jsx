import Navbar from "../components/layout/Navbar";
import Hero from "../components/common/Hero";
import EmergencyCategories from "../components/emergency/EmergencyCategories";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <EmergencyCategories />

      <footer className="border-t border-neutral-800 py-8 text-center bg-neutral-950">
        <h2 className="text-xl font-bold text-white">ResQ AI</h2>

        <p className="text-neutral-400 mt-2">
          AI Powered Emergency Response System
        </p>

        <p className="text-neutral-500 mt-3">
          Developed by Uday Maninder Reddy Yatham
        </p>

        <p className="text-neutral-600 text-sm mt-2">
          © 2026 All Rights Reserved
        </p>
      </footer>
    </>
  );
}

export default Home;