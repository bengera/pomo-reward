import { useEffect, useState } from "react";
import data from "./data.json";
import { Timer } from "./components/Timer";
import { RewardList } from "./components/RewardList";
import { ChooseTimes } from "./components/ChooseTimes";
import "./App.css";

function App() {
  const [rewards, setRewards] = useState(data);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [resetTime, setResetTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [money, setMoney] = useState(0);

  function Main({ children }) {
    return <main className="main">{children}</main>;
  }

  function PomoCounter() {
    return (
      <div className="pomo-counter">
        <h2>Pomdoros Completed</h2>
        <p className="counter">{"⭐".repeat(counter)}</p>
      </div>
    );
  }

  function MoneyCounter() {
    return (
      <div className="amount">
        <p className="amount-value">{`You have ${
          counter > 1 ? `${counter} stars` : `${counter} star`
        }  and $${money}`}</p>
      </div>
    );
  }

  function Reset() {
    console.log("Resetting Timer");
    setTimerRunning(false);
    setTimeLeft(resetTime);
  }

  useEffect(
    function () {
      if (timeLeft === 0 && timerRunning) {
        setCounter((count) => count + 1);
        setMoney((val) => val + 10);
      }
    },
    [timeLeft, timerRunning]
  );

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
      {timerRunning && timeLeft === 0 ? (
        <RewardList rewards={rewards} setRewards={setRewards} />
      ) : null}
      <ChooseTimes
        setTimeLeft={setTimeLeft}
        setResetTime={setResetTime}
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
      />
      <PomoCounter />
      <MoneyCounter />
    </div>
  );
}

export default App;
