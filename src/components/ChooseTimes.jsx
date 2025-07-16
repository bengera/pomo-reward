export function ChooseTimes({ setTimeLeft }) {
  function setChosenTime(time) {
    console.log(time);

    const [minutes, seconds] = time.split(":").map(Number);
    const total = minutes * 60 + seconds;
    setTimeLeft(total);
  }
  const times = ["5:00", "10:00", "15:00", "25:00", "30:00", "60:00"];

  return (
    <div className="times-container">
      {times.map((time) => (
        <button
          className="time-btn"
          onClick={() => setChosenTime(time)}
          key={time}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
