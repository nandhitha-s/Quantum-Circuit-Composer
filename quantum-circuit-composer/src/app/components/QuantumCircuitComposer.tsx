"use client";
import { useState, useEffect } from "react";
import { useCircuitStore } from "../store/useCircuitStore";
import CircuitCanvas from "./CircuitCanvas";
import { generateOpenQASM } from "../utils/qasmGenerator";
import GatePanel from "./GatePanel";
import { motion } from "framer-motion";
import QSphere from "./QSphere";
import Image from "next/image";
import ProbabilityChart from "./ProbabilityChart";

const QuantumCircuitComposer = () => {
  const { qubits } = useCircuitStore();
  const [executionResult, setExecutionResult] = useState<string | null>(null);
  const [qasmCode, setQasmCode] = useState<string | null>(null);
  const [stableResults, setStableResults] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Debugging: Log execution result
  useEffect(() => {
    console.log("Execution Result:", executionResult);
  }, [executionResult]);

  // Stabilizing Probability Chart Updates
  useEffect(() => {
    if (executionResult) {
      try {
        const parsedResult = JSON.parse(executionResult);
        console.log("Parsed Execution Result:", parsedResult); // Debugging ✅
        
        if (parsedResult.probabilities) {
          setStableResults(parsedResult.probabilities); // ✅ Store probabilities
        }
      } catch (error) {
        console.error("Error parsing execution result:", error);
      }
    }
  }, [executionResult]);

  const runCircuit = async () => {
    const generatedQasm = generateOpenQASM(qubits);
    setQasmCode(generatedQasm);
    console.log("Generated OpenQASM:\n", generatedQasm);
  
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qasm: generatedQasm }),
      });
  
      // ✅ Read raw response
      const text = await response.text();
      console.log("🔍 Raw API Response:", text);
  
      // ✅ Try parsing JSON response
      try {
        const result = JSON.parse(text);
        console.log("✅ Parsed JSON:", result);
        setExecutionResult(result.output);
  
        if (result.probabilities) {
          setStableResults(result.probabilities);
        }
      } catch (jsonError) {
        console.error("🚨 JSON Parsing Error:", jsonError);
        setExecutionResult("Error parsing execution result.");
      }
    } catch (error) {
      console.error("🚨 Execution failed:", error);
      setExecutionResult("Execution failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-[#161616] min-h-screen text-white w-full">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#1a1a1a] shadow-md z-50 py-3 px-4 sm:px-6 flex items-center border-b border-gray-700">
        <Image src="/logo.png" alt="Quantum Logo" width={40} height={40} className="sm:w-10 sm:h-10"/>
        <h1 className="text-xl sm:text-2xl font-bold ml-3 sm:ml-4 text-white">
          Quantum Circuit Composer
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row w-full mt-16 px-4 sm:px-6 space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Gate Panel */}
        <motion.div
          className="sm:w-1/5 w-full bg-[#222] p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4 border border-gray-700"
          whileHover={{ scale: 1.02 }}
        >
          <GatePanel />
        </motion.div>

        {/* Circuit Canvas */}
        <motion.div
          className="sm:w-4/5 w-full bg-[#222] p-4 sm:p-6 rounded-lg shadow-lg flex flex-col space-y-4 border border-gray-700"
          whileHover={{ scale: 1.01 }}
        >
          <CircuitCanvas />
        </motion.div>
      </div>

      {/* Run Circuit Button */}
      <motion.button
        onClick={runCircuit}
        className="mt-4 px-4 sm:px-6 py-2 bg-[#ffcc00] text-black font-semibold rounded-md shadow-md transition hover:bg-[#e6b800] text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ▶ Run Circuit
      </motion.button>

      {/* OpenQASM Code & Execution Result */}
      <motion.div className="w-full bg-[#222] p-4 sm:p-6 rounded-lg shadow-lg mt-6 space-y-6 border border-gray-700">
        {/* OpenQASM Code */}
        <div>
          <h2 className="text-lg font-bold mb-2 text-white">OpenQASM Code</h2>
          <div className="p-3 bg-[#292929] rounded max-h-40 overflow-auto text-white text-xs sm:text-sm">
            {qasmCode ? <pre>{qasmCode}</pre> : <p className="text-gray-400">No QASM code generated yet.</p>}
          </div>
        </div>

        {/* Execution Result */}
        <motion.div animate={{ opacity: executionResult ? 1 : 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-lg font-bold mb-2 text-white">Execution Result</h2>
          <div className="p-3 bg-[#292929] rounded max-h-40 overflow-auto text-white text-xs sm:text-sm">
            {executionResult ? <pre>{executionResult}</pre> : <p className="text-gray-400">No result yet. Run the circuit.</p>}
          </div>
        </motion.div>

        {/* QSphere Representation (Only for non-mobile screens) */}
        {!isMobile && (
          <motion.div className="w-full bg-[#222] p-4 sm:p-6 rounded-lg shadow-lg mt-6 space-y-6 border border-gray-700">
            <h2 className="text-lg font-bold mb-2 text-white">QSphere Representation</h2>
            <QSphere probabilities={stableResults} />
          </motion.div>
        )}

        {/* Probability Chart */}
        <div>
          <h2 className="text-lg font-bold mb-2 text-white">Probability Distribution</h2>
          <ProbabilityChart results={stableResults} />
        </div>
      </motion.div>
    </div>
  );
};

export default QuantumCircuitComposer;
