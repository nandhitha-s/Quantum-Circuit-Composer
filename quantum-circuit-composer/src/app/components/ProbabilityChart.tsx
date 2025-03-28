"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface ProbabilityData {
  id: number;
  state: string;
  probability: number;
}

interface ProbabilityChartProps {
  results: Record<string, number>; 
}

const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ results }) => {
  const [probabilities, setProbabilities] = useState<ProbabilityData[]>([]);

  useEffect(() => {
    if (results && typeof results === "object") {
      const processedData: ProbabilityData[] = Object.entries(results).map(
        ([state, probability], index) => ({
          id: index,
          state: state.toString(), 
          probability: Number(probability) || 0, 
        })
      );
      console.log("Processed Chart Data:", processedData);
      setProbabilities(processedData); 
    }
  }, [results]);

  return (
    <motion.div 
      className="p-4 bg-transparent backdrop-blur-lg rounded-lg shadow-md border border-white/20"
      whileHover={{ scale: 1.02 }}
    >
      <h2 className="text-lg font-bold text-white mb-4">Probability Distribution</h2>

      {probabilities.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={probabilities} barSize={40}>
            <XAxis dataKey="state" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip cursor={{ fill: "#333" }} contentStyle={{ backgroundColor: "#222", border: "none", color: "#fff" }} />
            <Bar dataKey="probability" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
            
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffcc00" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-400">No probability data available.</p>
      )}
    </motion.div>
  );
};

export default ProbabilityChart;
