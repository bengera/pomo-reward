export function MoneyCounter({ money }) {
  return (
    <div className="amount">
      <div className="amount__coin-container">
        <p className="amount-value">
          {Number.isInteger(money) ? money : money.toFixed(2)}
        </p>{" "}
        <img className="reward__coin-img" src="assets/coin.svg" alt="coin" />
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
