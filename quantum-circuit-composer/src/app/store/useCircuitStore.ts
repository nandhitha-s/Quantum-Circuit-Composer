import { create } from "zustand";

interface CircuitStore {
  qubits: { gates: { id: number; type: string }[] }[];
  addQubit: () => void;
  removeQubit: () => void;
  addGate: (qubitIndex: number, gate: { id: number; type: string }) => void;
  removeGate: (qubitIndex: number, gateId: number) => void;
}

export const useCircuitStore = create<CircuitStore>((set) => ({
  qubits: [{ gates: [] }], // Initial state with one qubit
  addQubit: () =>
    set((state) => ({
      qubits: [...state.qubits, { gates: [] }],
    })),
  removeQubit: () =>
    set((state) => ({
      qubits: state.qubits.slice(0, -1),
    })),
  addGate: (qubitIndex, gate) =>
    set((state) => {
      const newQubits = [...state.qubits];

      // Ensure the qubit exists before adding a gate
      while (newQubits.length <= qubitIndex) {
        newQubits.push({ gates: [] });
      }

      newQubits[qubitIndex].gates.push(gate);
      return { qubits: newQubits };
    }),
  removeGate: (qubitIndex, gateId) =>
    set((state) => {
      const newQubits = [...state.qubits];
      if (newQubits[qubitIndex]) {
        newQubits[qubitIndex].gates = newQubits[qubitIndex].gates.filter(
          (gate) => gate.id !== gateId
        );
      }
      return { qubits: newQubits };
    }),
}));
