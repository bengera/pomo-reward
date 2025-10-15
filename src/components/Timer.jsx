export function Timer({ timeLeft, timerRunning, setTimerRunning, Reset }) {
  return (
    <>
      <p className="timer-count">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </p>

      <div className="buttons-container">
        {!timerRunning ? (
          <button
            onClick={() => setTimerRunning(true)}
            className="btn-control start"
          >
            Start timer
          </button>
        ) : (
          <button
            onClick={() => setTimerRunning(false)}
            className="btn-control stop"
          >
            Stop timer
          </button>
        )}

        <button onClick={() => Reset()} className="btn-control reset">
          Reset
        </button>
      </div>
      <div className="message-box">
        {timeLeft !== 0 ? (
          <p className="message-box__message">
            {timerRunning ? "Stay focused" : "Timer paused"}
          </p>
        ) : (
          <p className="message-box__message">You did it!</p>
        )}
      </div>
    </>
  );
}
