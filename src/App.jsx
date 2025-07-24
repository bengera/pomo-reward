import { useEffect, useState } from "react";
import data from "./data.json";
import { Timer } from "./components/Timer";
import { RewardList } from "./components/RewardList";
import { ChooseTimes } from "./components/ChooseTimes";
import { PomoCounter } from "./components/PomoCounter";
import { MoneyCounter } from "./components/MoneyCounter";
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

  function Reset() {
    console.log("Resetting Timer");
    setTimerRunning(false);
    setTimeLeft(resetTime);
  }

  useEffect(
    function () {
      if (timeLeft === 0 && timerRunning) {
        setCounter((count) => count + 1);
        setTimerRunning(false);
        if (money >= 100) return;
        const ratePerSecond = 10 / 3600; // $10 per 3600 seconds - one hour
        const calcMoneyEarned = resetTime * ratePerSecond;
        const roundMoney = Math.round(calcMoneyEarned * 100) / 100;
        console.log(roundMoney);
        setMoney((val) => val + roundMoney);
      }
    },
    [timeLeft, timerRunning, money, resetTime]
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
    [timeLeft, timerRunning]
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

      <RewardList
        rewards={rewards}
        setRewards={setRewards}
        money={money}
        setMoney={setMoney}
        timerRunning={timerRunning}
        timeLeft={timeLeft}
      />

      <ChooseTimes
        setTimeLeft={setTimeLeft}
        setResetTime={setResetTime}
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
      />
      <PomoCounter counter={counter} />
      <MoneyCounter money={money} />
      <p className="app-description">
        Welcome to Pomo Reward, this app follows the Pomodoro Technique. Choose
        an amount of time that you want to focus for, once you have completed
        your task you will earn money which you can later spend on rewards of
        your choosing.
      </p>
    </div>
  );
}

export default App;
