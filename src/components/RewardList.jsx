export function RewardList({
  rewards,
  setRewards,
  money,
  setMoney,
  timerRunning,
  timeLeft,
}) {
  function handleClaim(itemToClaim) {
    console.log(itemToClaim);
    const updatedArr = rewards.filter((item) => item.id !== itemToClaim.id);
    if (money < itemToClaim.price) return;
    setRewards(updatedArr);
    setMoney((prev) => prev - itemToClaim.price);
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
            </div>
          </div>
        </div>
      ))}
      <form className="form">
        <input type="text" placeholder="Enter reward" />
        <select name="cost" id="cost-dropdown">
          <option value="5" className="value">
            5
          </option>
          <option value="10" className="value">
            10
          </option>
          <option value="15" className="value">
            15
          </option>
          <option value="20" className="value">
            20
          </option>
        </select>
        <button>Add</button>
      </form>
    </div>
  );
}
