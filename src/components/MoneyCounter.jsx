export function MoneyCounter({ money }) {
  return (
    <div className="amount">
      <p className="amount-value">{`$${money}`}</p>
      <div className="progress-bar">
        <div
          className="money"
          style={{
            width: `${money}%`,
            backgroundColor: money === 0 ? "transparent" : "rgb(51, 204, 21)",
          }}
        >
          {money}%
        </div>
      </div>
    </div>
  );
}
