export function RewardList({ rewards, setRewards, money, setMoney }) {
  function handleClaim(itemToClaim) {
    console.log(itemToClaim);
    const updatedArr = rewards.filter((item) => item.id !== itemToClaim.id);
    if (money < itemToClaim.price) return;
    setRewards(updatedArr);
    setMoney((prev) => prev - itemToClaim.price);
  }

  return (
    <div className="list">
      <h2 className="reward-heading">Choose a Reward</h2>
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
    </div>
  );
}
