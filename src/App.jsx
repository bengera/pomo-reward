import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "./success.json";
import "./App.css";
import data from "./data.json";
import quotations from "./quotes.json";
import { Timer } from "./components/Timer";
import { RewardList } from "./components/RewardList";
import { ChooseTimes } from "./components/ChooseTimes";
import { PomoCounter } from "./components/PomoCounter";
import { MoneyCounter } from "./components/MoneyCounter";

function App() {
  const [overlay, setOverlay] = useState(false);
  const [rewards, setRewards] = useState(data);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [resetTime, setResetTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [money, setMoney] = useState(100);
  const [currentClaim, setCurrentClaim] = useState("");
  const [allQuotes] = useState(quotations);
  const [selectedQuote, setSelectedQuote] = useState("");

  function Main({ children }) {
    return <main className="main">{children}</main>;
  }

  function Reset() {
    console.log("Resetting Timer");
    setTimerRunning(false);
    setTimeLeft(resetTime);
  }

  function Modal() {
    return (
      <div className="modal-box">
        <p className="modal-title">{currentClaim.description}</p>
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
          style={{ width: 400, height: 400 }}
        />
        <h2 className="modal-congrats">"{selectedQuote.quote}"</h2>
        <small>{selectedQuote.author}</small>

        <button className="btn-modal-close" onClick={() => setOverlay(false)}>
          Close
        </button>
      </div>
    );
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

  function Header() {
    return (
      <div className="header">
        <div className="header-content">
          <h1>PomoReward</h1>
        </div>
      </div>
    );
  }

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
        </Main>

        <RewardList
          rewards={rewards}
          setRewards={setRewards}
          money={money}
          setMoney={setMoney}
          timerRunning={timerRunning}
          timeLeft={timeLeft}
          setOverlay={setOverlay}
          setCurrentClaim={setCurrentClaim}
          allQuotes={allQuotes}
          setSelectedQuote={setSelectedQuote}
        />

        <ChooseTimes
          setTimeLeft={setTimeLeft}
          setResetTime={setResetTime}
          timerRunning={timerRunning}
          setTimerRunning={setTimerRunning}
        />
        <PomoCounter counter={counter} />
        <MoneyCounter money={money} />

        {overlay === true ? <Modal /> : null}
        <p className="footer-note">Made by Ben Geraghty</p>
      </div>
    </>
  );
}

export default App;
