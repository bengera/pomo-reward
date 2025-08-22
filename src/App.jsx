import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "./success.json";
// import data from "./data.json";
import quotations from "./quotes.json";
import { Header } from "./components/Header";
import { Timer } from "./components/Timer";
import { RewardList } from "./components/RewardList";
import { ChooseTimes } from "./components/ChooseTimes";
import { PomoCounter } from "./components/PomoCounter";
import { MoneyCounter } from "./components/MoneyCounter";
import { RewardCounter } from "./components/RewardsCounter";
/*CSS */
import "./styles/App.css";
import "./styles/header.css";
import "./styles/rewards.css";
import "./styles/modal.css";

function App() {
  const [overlay, setOverlay] = useState(false);
  const [rewards, setRewards] = useState(function () {
    const storedReward = localStorage.getItem("rewards");
    return storedReward ? JSON.parse(storedReward) : [];
  });
  const [rewardsCounter, setRewardsCounter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [resetTime, setResetTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [money, setMoney] = useState(0);
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

  function Progress({ children }) {
    return (
      <div className="stats-container">
        <h2 className="stats">Stats</h2>
        <p style={{ textDecoration: "underline", marginBottom: "10px" }}>
          Counters only count for this session
        </p>
        {children}
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

        {overlay === true ? <Modal /> : null}
      </div>
      <div className="credit">
        <p className="footer-note">Made by Ben Geraghty</p>
        <div className="social-icons">
          <img
            className="icon-github"
            src="assets/github-mark-white.svg"
            alt="GitHub"
          />
        </div>
      </div>
    </>
  );
}

export default App;
