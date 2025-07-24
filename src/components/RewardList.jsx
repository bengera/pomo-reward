import { useState } from "react";

export function RewardList({
  rewards,
  setRewards,
  money,
  setMoney,
  timerRunning,
  timeLeft,
  setOverlay,
  setCurrentClaim,
}) {
  const [newReward, setNewReward] = useState("");
  const [amount, setAmount] = useState("5");

  function addNewReward(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      description: newReward,
      category: "reward",
      price: Number(amount),
    };
    setRewards((prev) => [...prev, newItem]);
    setNewReward("");
  }

  function handleClaim(itemToClaim) {
    if (money < itemToClaim.price) return;
    setOverlay(true);
    setCurrentClaim(itemToClaim);
    const updatedArr = rewards.filter((item) => item.id !== itemToClaim.id);
    setRewards(updatedArr);
    setMoney((prev) => prev - itemToClaim.price);
  }

  function handleDelete(itemToRemove) {
    const updatedArr = rewards.filter(
      (rewardItem) => rewardItem.id !== itemToRemove.id
    );
    setRewards(updatedArr);
  }

  return (
    <div className={!timerRunning && timeLeft === 0 ? "list" : "list-disabled"}>
      <h2 className="reward-heading">
        {rewards.length > 0 ? "Choose a Reward" : "Add some rewards"}
      </h2>
      {rewards.map((item) => (
        <div className="reward-block" key={item.id}>
          <p className="reward-text">{item.description}</p>
          <div className="left-content">
            <div className="right-content">
              <p className="reward-cost">${item.price.toFixed(2)}</p>
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
      <form className="form" onSubmit={addNewReward}>
        <input
          type="text"
          placeholder="Enter reward"
          value={newReward}
          onChange={(e) => setNewReward(e.target.value)}
        />
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
        <button>Add</button>
      </form>
    </div>
  );
}
