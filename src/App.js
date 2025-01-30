// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import BlockchainGraph from "./components/BlockchainGraph";

function App() {
  return (
    <div>
      <h1
        style={{
          position: "absolute",
          top: "10px",
          left: "20px",
          color: "white",
        }}
      >
        3D 区块链交易可视化
      </h1>
      <BlockchainGraph />
    </div>
  );
}

export default App;
