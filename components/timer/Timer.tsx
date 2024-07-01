import { useEffect, useState } from "react";
import { useTimerStore } from "../../app/timer.store";
import { Button } from "../ui/button";

export const Timer = ({ timer }) => {
  const { id, hours, minutes, seconds, isRunning } = timer;
  const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds);
  const deleteTimer = useTimerStore((state) => state.deleteTimer);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (time <= 0) {
          clearInterval(interval);
          alert("Time is up!");
        }
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div className="flex items-center space-x-4">
      <div>
        {Math.floor(time / 3600)}:{Math.floor((time % 3600) / 60)}:{time % 60}
      </div>
      <Button onClick={() => toggleTimer(id)} className="btn">
        {isRunning ? "Pause" : "Play"}
      </Button>
      <Button onClick={() => deleteTimer(id)} className="btn btn-danger">
        Delete
      </Button>
    </div>
  );
};
