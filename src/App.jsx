import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);

  function Reset() {
    console.log("Resetting Timer");
    setTimerRunning(false);
    setTimeLeft(1500);
  }

  useEffect(
    function () {
      if (!timerRunning || timeLeft === 0) return;
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return function () {
        clearInterval(interval);
      };
    },
    [timerRunning, timeLeft]
  );

  return (
    <>
      <Main>
        <Timer
          timeLeft={timeLeft}
          setTimerRunning={setTimerRunning}
          Reset={Reset}
          timerRunning={timerRunning}
        ></Timer>
      </Main>
      <RewardList />
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Timer({ timeLeft, timerRunning, setTimerRunning, Reset }) {
  return (
    <>
      <p className="timer-count">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </p>
      <div className="buttons-container">
        <button
          onClick={() => setTimerRunning(true)}
          className="btn-control start"
        >
          Start
        </button>
        <button
          onClick={() => setTimerRunning(false)}
          className="btn-control stop"
        >
          Stop
        </button>
        <button onClick={() => Reset()} className="btn-control reset">
          Reset
        </button>
      </div>
      <div className="message-box">
        <p className="message-box__message">
          {timerRunning ? "Stay focused" : "Timer paused"}
        </p>
      </div>
    </>
  );
}

function RewardList() {
  return (
    <div className="list">
      <h2 className="reward-heading">Choose a Reward</h2>
      <ul className="list-items">
        <li className="list-item-element">Watch a movie</li>
        <li className="list-item-element">Play a game for two hours</li>
        <li className="list-item-element">Order a drink</li>
      </ul>
    </div>
  );
}

export default App;
