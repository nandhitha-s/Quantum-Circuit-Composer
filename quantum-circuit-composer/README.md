# Quantum Circuit Composer

## Overview

Quantum Circuit Composer is a web-based application that enables users to design, visualize, and simulate quantum circuits. Leveraging the power of quantum computing frameworks, this tool provides an intuitive interface for both beginners and experts to experiment with quantum algorithms.

## Features

- **Drag-and-Drop Interface**: Easily construct quantum circuits using a user-friendly graphical interface.
- **Real-Time Visualization**: Observe the state of your quantum circuit as you build and modify it.
- **Simulation Support**: Run simulations of your quantum circuits to test and validate quantum algorithms.
- **Multiple Qubit Support**: Design circuits with multiple qubits and apply various quantum gates.
- **Integration with Quantum Frameworks**: Utilize underlying quantum computing libraries for accurate simulations.

## Installation

To set up the Quantum Circuit Composer locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nandhitha-s/Quantum-Circuit-Composer.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd Quantum-Circuit-Composer
   ```
3. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm start
   ```
   This will launch the application at `http://localhost:3000/`.

## Usage

- **Adding Qubits**: Click on the "Add Qubit" button to introduce a new qubit line to your circuit.
- **Applying Gates**: Drag and drop quantum gates from the toolbar onto the qubit lines. Supported gates include Hadamard (H), Pauli-X (X), Pauli-Y (Y), Pauli-Z (Z), and more.
- **Connecting Gates**: For controlled operations, connect control and target qubits by dragging from one gate to another.
- **Simulating the Circuit**: Once your circuit is designed, click on the "Simulate" button to observe the output and state vector.
- **Resetting the Circuit**: Use the "Reset" button to clear the current circuit and start anew.

## Project Structure

The project is organized as follows:

```
Quantum-Circuit-Composer/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Gate.js
│   │   ├── Qubit.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

- **`public/`**: Contains static files, including the main HTML file.
- **`src/`**: Contains the React components and main application logic.
  - **`components/`**: Holds individual React components for gates, qubits, and other UI elements.
  - **`App.js`**: The root component that combines all parts of the application.
  - **`index.js`**: The entry point of the React application.

## Dependencies

The project relies on the following major dependencies:

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **Quantum Computing Libraries**: Integrates with quantum frameworks for simulation purposes.

For a complete list of dependencies, refer to the `package.json` file.

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository**: Click on the "Fork" button at the top right of the repository page.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/Quantum-Circuit-Composer.git
   ```
3. **Create a New Branch**:
   ```bash
   git checkout -b feature-name
   ```
4. **Make Your Changes**: Implement your feature or fix.
5. **Commit Your Changes**:
   ```bash
   git commit -m "Description of your changes"
   ```
6. **Push to Your Fork**:
   ```bash
   git push origin feature-name
   ```
7. **Submit a Pull Request**: Navigate to the original repository and create a pull request from your fork.

Please ensure your code follows the project's coding standards and includes appropriate tests.




