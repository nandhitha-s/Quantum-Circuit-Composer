"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Data, Layout, Config } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface QSphereProps {
  probabilities: { [key: string]: number };
}

const QSphere: React.FC<QSphereProps> = ({ probabilities }) => {
  const [data, setData] = useState<Data[]>([]); 

  useEffect(() => {
    if (!probabilities) return;

    const states = Object.keys(probabilities);
    const probs = Object.values(probabilities);

    const angles = states.map((_, i) => (i * Math.PI * 2) / states.length);
    const radii = probs.map((p) => Math.sqrt(p)); 

    const x = radii.map((r, i) => r * Math.sin(angles[i]));
    const y = radii.map((r, i) => r * Math.cos(angles[i]));
    const z = probs; 

    setData([
      {
        type: "scatter3d",
        mode: "markers",
        x,
        y,
        z,
        marker: {
          size: 10,
          color: probs,
          colorscale: "Viridis",
          opacity: 0.8,
        },
      },
    ]);
  }, [probabilities]);

  const layout: Partial<Layout> = {
    title: "QSphere",
    paper_bgcolor: "#222",
    plot_bgcolor: "#222",
    margin: { l: 0, r: 0, t: 30, b: 0 },
    scene: {
      xaxis: { title: "X", color: "#fff", showgrid: false },
      yaxis: { title: "Y", color: "#fff", showgrid: false },
      zaxis: { title: "Probability", color: "#fff", showgrid: false },
    },
  };

  const config: Partial<Config> = {
    displayModeBar: false,
  };

  return (
    <div className="bg-[#222] p-4 sm:p-6 rounded-lg shadow-md border border-gray-700 w-full">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">
        QSphere Representation
      </h2>
      <div className="w-full h-[300px] sm:h-[400px]">
        <Plot
          data={data}
          layout={layout} 
          config={config} 
          style={{ width: "100%", height: "100%" }} 
        />
      </div>
    </div>
  );
};

export default QSphere;
