import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Main>
        <Timer></Timer>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Timer() {
  return (
    <>
      <p className="timer-count">25:00</p>
      <div className="buttons-container">
        <button className="btn-control start">Start</button>
        <button className="btn-control stop">Stop</button>
        <button className="btn-control reset">Reset</button>
      </div>
    </>
  );
}

export default App;
