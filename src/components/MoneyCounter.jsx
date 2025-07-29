export function MoneyCounter({ money }) {
  return (
    <div className="amount">
      <p className="amount-value">{`You have earned ${money}/100 coins`}</p>
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
