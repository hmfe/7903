import React from "react";
import "./styles/App.css";
import DashBoard from "./Components/Dashboard";

function App() {
  return (
    <React.Fragment>
      <header className="App-header">
        <h3>Auto Complete Search box</h3>
      </header>
      <main className="App-body">
        <DashBoard></DashBoard>
      </main>
    </React.Fragment>
  );
}

export default App;
