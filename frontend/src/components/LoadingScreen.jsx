import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center z-50">

      <div className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>

      <h2 className="text-white text-2xl font-bold mt-8">
        ResQ AI
      </h2>

      <p className="text-neutral-400 mt-3">
        AI is analyzing the emergency...
      </p>

    </div>
  );
}