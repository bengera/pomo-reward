export function MoneyCounter({ money }) {
  return (
    <div className="amount">
      <div className="amount-coin-container">
        <p className="amount-value">{`${money}`}</p>{" "}
        <img className="reward-coin" src="assets/coin.svg" alt="coin" />
      </div>
      <div className="progress-bar">
        <div
          className="money"
          style={{
            width: `${money}%`,
            backgroundColor: money === 0 ? "transparent" : "var(--accent-gold)",
          }}
        ></div>
      </div>
    </div>
  );
}
