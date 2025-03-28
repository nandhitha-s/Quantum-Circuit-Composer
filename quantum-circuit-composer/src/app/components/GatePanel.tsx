"use client";
import DraggableGate from "./DraggableGate";

const GatePanel = () => {
  return (
    <div className="p-6 bg-transparent backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 w-60">
      <h2 className="text-xl font-semibold text-white text-center mb-4">
        Quantum Gates
      </h2>

      {/* Gates Grid Layout */}
      <div className="grid grid-cols-2 gap-4 justify-items-center">
        <DraggableGate type="H_GATE" />
        <DraggableGate type="CNOT_GATE" />
      </div>
    </div>
  );
};

export default GatePanel;
