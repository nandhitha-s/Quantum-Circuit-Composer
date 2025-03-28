import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { qasm } = await req.json();

    if (!qasm) {
      return NextResponse.json({ error: "No QASM provided" }, { status: 400 });
    }

    // Simulated quantum execution returning dynamic probabilities
    const executionResult = runQuantumCircuit(qasm);

    return NextResponse.json(executionResult); 
  } catch (error) {
    return NextResponse.json({ error: "Execution error" }, { status: 500 });
    console.log(error)
  }
}


function runQuantumCircuit(qasm: string) {
  console.log("Executing QASM:\n", qasm);


  const qubitMatch = qasm.match(/qreg q\[(\d+)\];/);
  const qubitCount = qubitMatch ? parseInt(qubitMatch[1]) : 2; 

  const possibleStates = Array.from({ length: 2 ** qubitCount }, (_, i) =>
    i.toString(2).padStart(qubitCount, "0")
  );

  const probabilities: Record<string, number> = {};
  let sum = 0;
  for (const state of possibleStates) {
    probabilities[state] = Math.random(); 
    sum += probabilities[state];
  }

  for (const state in probabilities) {
    probabilities[state] = parseFloat((probabilities[state] / sum).toFixed(3));
  }

  return {
    output: "Result: Simulated Quantum State",
    probabilities: probabilities,
  };
}
