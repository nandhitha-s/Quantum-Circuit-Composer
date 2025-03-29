"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import CircuitCanvas from "./components/CircuitCanvas";
import QuantumCircuitComposer from "./components/QuantumCircuitComposer";


export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        {/* <CircuitCanvas /> */}
        <QuantumCircuitComposer/>
      </div>
    </DndProvider>
  );
}
