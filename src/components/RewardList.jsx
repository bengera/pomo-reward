export function RewardList({ rewards }) {
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
