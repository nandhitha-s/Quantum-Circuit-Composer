"use client";
import { useDrop } from "react-dnd";
import { useCircuitStore } from "../store/useCircuitStore";
import DraggableGate from "./DraggableGate"; 

const QubitLine = ({ index }: { index: number }) => {
  const addGate = useCircuitStore((state) => state.addGate);
  const removeGate = useCircuitStore((state) => state.removeGate);
  const qubits = useCircuitStore((state) => state.qubits);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["H_GATE", "CNOT_GATE", "X_GATE", "Y_GATE", "Z_GATE", "T_GATE"],
    drop: (item: { type: string }) => {
      if (!item || !item.type) {
        console.error("Invalid item dropped:", item);
        return;
      }
      console.log(`Dropped: ${item.type} on Qubit ${index}`);
      addGate(index, { id: Date.now(), type: item.type });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative flex items-center border-b border-white h-16 px-4 ${
        isOver ? "bg-gray-200 scale-105 transition-transform" : ""
      }`}
    >
      <span className="absolute left-2 text-lg font-semibold text-gray-700 text-white">
        q[{index}]
      </span>

      <div className="flex space-x-3 pl-16">
        {qubits[index]?.gates.map((gate) => (
          <div
            key={gate.id}
            className="relative group"
            onClick={() => removeGate(index, gate.id)}
          >
            <DraggableGate type={gate.type} />

            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              ✕
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QubitLine;