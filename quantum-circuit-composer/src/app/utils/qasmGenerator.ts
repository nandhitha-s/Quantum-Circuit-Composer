export const generateOpenQASM = (qubits: { gates: { id: number; type: string }[] }[]) => {
    let qasmCode = `OPENQASM 2.0;\ninclude "qelib1.inc";\n\n`;
  
    // Define the number of qubits based on the qubits array
    qasmCode += `qreg q[${qubits.length}];\n`;
  
    qubits.forEach((qubit, qubitIndex) => {
      qubit.gates.forEach((gate) => {
        if (gate.type === "H_GATE") {
          qasmCode += `h q[${qubitIndex}];\n`;
        } else if (gate.type === "CNOT_GATE") {
          if (qubitIndex === 0) {
            console.warn("CNOT gate needs a control qubit above it!");
          } else {
            qasmCode += `cx q[${qubitIndex - 1}], q[${qubitIndex}];\n`;
          }
        }
      });
    });
  
    return qasmCode;
  };
  