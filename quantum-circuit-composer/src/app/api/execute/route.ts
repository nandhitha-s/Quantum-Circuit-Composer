import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { qasm } = await req.json();

    if (!qasm) {
      return NextResponse.json({ error: "No QASM provided" }, { status: 400 });
    }

    // Simulated quantum execution returning dynamic probabilities
    const executionResult = runQuantumCircuit(qasm);

    return NextResponse.json(executionResult); // ✅ Return dynamic JSON
  } catch (error) {
    return NextResponse.json({ error: "Execution error" }, { status: 500 });
  }
}

// 🎯 Function to dynamically simulate quantum execution
function runQuantumCircuit(qasm: string) {
  console.log("Executing QASM:\n", qasm);

  // Extract qubit count from QASM
  const qubitMatch = qasm.match(/qreg q\[(\d+)\];/);
  const qubitCount = qubitMatch ? parseInt(qubitMatch[1]) : 2; // Default to 2 qubits

  // Generate all possible states (00, 01, ..., 11 for n qubits)
  const possibleStates = Array.from({ length: 2 ** qubitCount }, (_, i) =>
    i.toString(2).padStart(qubitCount, "0")
  );

  // Assign random probabilities (simulating quantum randomness)
  let probabilities: Record<string, number> = {};
  let sum = 0;
  for (const state of possibleStates) {
    probabilities[state] = Math.random(); // Random value
    sum += probabilities[state];
  }

  // Normalize probabilities to sum up to 1
  for (const state in probabilities) {
    probabilities[state] = parseFloat((probabilities[state] / sum).toFixed(3));
  }

  return {
    output: "Result: Simulated Quantum State",
    probabilities: probabilities,
  };
}
