export function Progress({ children }) {
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
