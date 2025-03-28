"use client";
import { useState } from "react";
import QubitLine from "./QubitLine";

const CircuitCanvas = () => {
  const [qubits, setQubits] = useState<number>(2); // Default 2 qubits

  const addQubit = () => setQubits((prev) => prev + 1);
  const removeQubit = () => setQubits((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="p-6 bg-transparent backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-extrabold text-white text-center mb-6 tracking-wide uppercase">
        Quantum Circuit
      </h2>

      {/* Qubit Lines */}
      <div className="space-y-4 p-4 bg-transparent backdrop-blur-md rounded-lg shadow-lg border border-white/20">
        {Array.from({ length: qubits }, (_, i) => (
          <QubitLine key={i} index={i} />
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-6 mt-6">
        <button
          onClick={addQubit}
          className="px-6 py-3 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-100 hover:shadow-blue-500/50"
        >
          ＋ Add Qubit
        </button>

        <button
          onClick={removeQubit}
          className="px-6 py-3 bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-100 hover:shadow-red-500/50"
        >
          － Remove Qubit
        </button>
      </div>
    </div>
  );
};

export default CircuitCanvas;
