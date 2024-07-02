import { useEffect, useState } from "react";
import { Timer as TimerType, useTimerStore } from "../../app/timer.store";
import { Button } from "../ui/button";

type TimerProps = {
  timer: TimerType;
};

export const Timer: React.FC<TimerProps> = ({ timer }) => {
  const deleteTimer = useTimerStore((state) => state.deleteTimer);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);

  return (
    <div className="flex items-center space-x-4">
      <div>
        {/* {Math.floor(time / 3600)}:{Math.floor((time % 3600) / 60)}:{time % 60} */}
        {new Date(timer.timeLeft).toISOString().substr(11, 8)}
      </div>
      <Button onClick={() => toggleTimer(timer.id)} className="btn">
        {timer.isRunning ? "Pause" : "Play"}
      </Button>
      <Button onClick={() => deleteTimer(timer.id)} className="btn btn-danger">
        Delete
      </Button>
    </div>
  );
};
