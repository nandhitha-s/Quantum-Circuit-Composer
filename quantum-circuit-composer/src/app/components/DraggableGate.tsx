"use client";
import { useDrag } from "react-dnd";
import { useRef, useEffect } from "react";

const DraggableGate = ({ type }: { type: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  const gateStyles: Record<string, string> = {
    H_GATE: "bg-blue-500 text-white", // Hadamard
    X_GATE: "bg-purple-500 text-white", // Pauli-X
    Y_GATE: "bg-green-500 text-white", // Pauli-Y
    Z_GATE: "bg-yellow-500 text-black", // Pauli-Z
    T_GATE: "bg-red-500 text-white", // T-Gate
    CNOT_GATE: "bg-gray-800 text-white relative flex flex-col items-center", // CNOT with dot
  };

  return (
    <div
      ref={ref}
      className={`w-14 h-14 flex items-center justify-center font-bold rounded-lg border-2 border-gray-800 cursor-pointer shadow-md transition-transform transform hover:scale-110 ${
        gateStyles[type] || "bg-gray-500"
      } ${isDragging ? "opacity-50 scale-90" : ""}`}
    >
      {type === "CNOT_GATE" ? (
        <>
          <div className="w-3 h-3 bg-white rounded-full absolute top-2"></div>
          <div className="w-6 h-0.5 bg-white absolute top-6"></div>
          <div className="w-3 h-3 bg-white rounded-full absolute bottom-2"></div>
        </>
      ) : (
        <span className="text-lg">{type.replace("_GATE", "")}</span>
      )}
    </div>
  );
};

export default DraggableGate;
