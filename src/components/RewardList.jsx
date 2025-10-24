import { useEffect, useState } from "react";
import { useRef } from "react";

export function RewardList({
  rewards,
  setRewards,
  money,
  setMoney,
  setRewardsCounter,
  timerRunning,
  timeLeft,
  setOverlay,
  setCurrentClaim,
  allQuotes,
  setSelectedQuote,
}) {
  const [newReward, setNewReward] = useState("");
  const [amount, setAmount] = useState("5");
  const inputReward = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (timerRunning) return;
        if (e.code === "Enter") {
          console.log("Enter key pressed");
          inputReward.current?.focus();
        } else if (e.code === "Escape") {
          inputReward.current?.blur();
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [timerRunning]
  );

  function addNewReward(e) {
    e.preventDefault();
    if (rewards.length > 7 && newReward) {
      alert("Rewards list is full");
      return;
    }

    if (!newReward.trim()) return;

    const newItem = {
      id: crypto.randomUUID(),
      description: newReward,
      category: "reward",
      price: Number(amount),
    };
    setRewards((prev) => [...prev, newItem]);
    setNewReward("");
  }

  function handleClaim(itemToClaim) {
    if (money < itemToClaim.price) return;
    setRewardsCounter((prev) => prev + 1);
    setOverlay(true);
    setCurrentClaim(itemToClaim);
    const updatedArr = rewards.filter((item) => item.id !== itemToClaim.id);
    setRewards(updatedArr);
    setMoney((prev) => prev - itemToClaim.price);
    const randomQuote = Math.floor(Math.random() * allQuotes.length);
    console.log(randomQuote);
    setSelectedQuote(allQuotes[randomQuote]);
  }

  function handleDelete(itemToRemove) {
    const updatedArr = rewards.filter(
      (rewardItem) => rewardItem.id !== itemToRemove.id
    );
    setRewards(updatedArr);
  }

  return (
    <div className={!timerRunning || timeLeft === 0 ? "list" : "list-disabled"}>
      <h2 className="reward__heading">
        {rewards.length > 0 ? "Choose a Reward" : "Add some rewards"}
      </h2>
      <form className="form" onSubmit={addNewReward}>
        <input
          id="input-reward"
          type="text"
          placeholder="Enter reward"
          value={newReward}
          onChange={(e) => setNewReward(e.target.value)}
          ref={inputReward}
        />
        <div className="custom-select">
          <select
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            name="cost"
            id="cost-dropdown"
          >
            <option value="5" className="value">
              $5.00
            </option>
            <option value="10" className="value">
              $10.00
            </option>
            <option value="15" className="value">
              $15.00
            </option>
            <option value="20" className="value">
              $20.00
            </option>
          </select>
        </div>
        <button>Add</button>
      </form>
      {rewards.map((item) => (
        <div className="reward__block" key={item.id}>
          <p className="reward__text">{item.description}</p>
          <div className="reward__left-content">
            <div className="reward__right-content">
              <p className="reward__cost">
                {Math.floor(item.price)}
                <img
                  className="reward__coin-img"
                  src="assets/coin.svg"
                  alt="coin"
                />
              </p>
              <button className="btn-claim" onClick={() => handleClaim(item)}>
                Claim
              </button>
              <button className="btn-delete" onClick={() => handleDelete(item)}>
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
