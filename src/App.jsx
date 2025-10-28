import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Timer } from "./components/Timer";
import { RewardList } from "./components/RewardList";
import { ChooseTimes } from "./components/ChooseTimes";
import { PomoCounter } from "./components/PomoCounter";
import { MoneyCounter } from "./components/MoneyCounter";
import { RewardCounter } from "./components/RewardsCounter";
import { Progress } from "./components/Progress";
import { Credit } from "./components/Credit";
import { Modal } from "./components/Modal";
import quotations from "./quotes.json";
/*CSS */
import "./sass/app.scss";
import "./sass/header.scss";
import "./sass/rewards.scss";
import "./sass/modal.scss";

function App() {
  const [overlay, setOverlay] = useState(false);
  const [rewards, setRewards] = useState(function () {
    const storedReward = localStorage.getItem("rewards");
    return storedReward ? JSON.parse(storedReward) : [];
  });
  const [rewardsCounter, setRewardsCounter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);
  const [resetTime, setResetTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [money, setMoney] = useState(35);
  const [currentClaim, setCurrentClaim] = useState("");
  const [selectedQuote, setSelectedQuote] = useState("");
  const allQuotes = quotations;

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
      localStorage.setItem("rewards", JSON.stringify(rewards));
    },
    [rewards]
  );

  useEffect(
    function () {
      if (timeLeft === 0 && timerRunning) {
        setCounter((count) => count + 1);
        setTimerRunning(false);
        if (money >= 100) return;
        const ratePerSecond = 10 / 3600; // $10 per 3600 seconds - one hour
        const calcMoneyEarned = resetTime * ratePerSecond;
        const roundMoney = Math.round(calcMoneyEarned * 100) / 100;
        setMoney((val) => val + roundMoney);
      }
    },
    [timeLeft, timerRunning, money, resetTime]
  );

  useEffect(
    function () {
      if (!timerRunning) return;
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    },
    [timerRunning]
  );

  return (
    <>
      <div className={overlay === true ? "overlay show" : "overlay"}></div>
      <Header />
      <div className="master-container">
        <Main>
          <Timer
            timeLeft={timeLeft}
            setTimerRunning={setTimerRunning}
            Reset={Reset}
            timerRunning={timerRunning}
          ></Timer>
          <ChooseTimes
            setTimeLeft={setTimeLeft}
            setResetTime={setResetTime}
            timerRunning={timerRunning}
            setTimerRunning={setTimerRunning}
          />
        </Main>

        <RewardList
          rewards={rewards}
          setRewards={setRewards}
          money={money}
          setMoney={setMoney}
          setRewardsCounter={setRewardsCounter}
          timerRunning={timerRunning}
          timeLeft={timeLeft}
          setOverlay={setOverlay}
          setCurrentClaim={setCurrentClaim}
          allQuotes={allQuotes}
          setSelectedQuote={setSelectedQuote}
        />

        <Progress>
          <PomoCounter counter={counter} />
          <RewardCounter rewardsCounter={rewardsCounter} />
          <MoneyCounter money={money} />
        </Progress>

        {overlay === true ? (
          <Modal
            currentClaim={currentClaim}
            selectedQuote={selectedQuote}
            setOverlay={setOverlay}
          />
        ) : null}
      </div>
      <Credit />
    </>
  );
}

export default App;
