import { useEffect, useState } from "react";
import data from "./data.json";
import "./App.css";

function App() {
  const [rewards, setRewards] = useState(data);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);

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
          {timeLeft !== 0 ? (
            <p className="message-box__message">
              {timerRunning ? "Stay focused" : "Timer paused"}
            </p>
          ) : (
            <p className="message-box__message">You did it!</p>
          )}
        </div>
      </>
    );
  }

  function ChooseTimes() {
    function setChosenTime(time) {
      console.log(time);
      setlastTime(time);
      const [minutes, seconds] = time.split(":").map(Number);
      const total = minutes * 60 + seconds;
      setTimeLeft(total);
    }
    const times = ["5:00", "10:00", "15:00", "25:00", "30:00", "60:00"];

    return (
      <div className="times-container">
        {times.map((time) => (
          <button
            className="time-btn"
            onClick={() => setChosenTime(time)}
            key={time}
          >
            {time}
          </button>
        ))}
      </div>
    );
  }

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
    <div className="master-container">
      <Main>
        <Timer
          timeLeft={timeLeft}
          setTimerRunning={setTimerRunning}
          Reset={Reset}
          timerRunning={timerRunning}
        ></Timer>
      </Main>
      {timerRunning && timeLeft === 0 ? <RewardList rewards={rewards} /> : null}
      <ChooseTimes />
    </div>
  );
}

function RewardList({ rewards }) {
  return (
    <div className="list">
      <h2 className="reward-heading">Choose a Reward</h2>
      {rewards.map((item) => (
        <div className="reward-block" key={item.id}>
          <p className="reward-text">{item.description}</p>
          <div className="left-content">
            <img
              className="reward-img"
              src={item.image}
              alt={item.description}
            />
            <button className="btn-claim">Claim</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
