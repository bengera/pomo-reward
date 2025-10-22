export function ChooseTimes({ setTimeLeft, setResetTime, timerRunning }) {
  function setChosenTime(time) {
    const [minutes, seconds] = time.split(":").map(Number);
    const total = minutes * 60 + seconds;
    setTimeLeft(total);
    setResetTime(total);
  }

  const times = [
    // "00:03", // only for testing
    "2:00",
    "5:00",
    "10:00",
    "15:00",
    "20:00",
    "30:00",
    "60:00",
    "80:00",
    "120:00",
  ];

  return (
    <div className="times-container">
      {times.map((time) => (
        <button
          className="time-btn"
          onClick={() => {
            setChosenTime(time);
          }}
          key={time}
          disabled={timerRunning}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
