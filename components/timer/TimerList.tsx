import React from "react";
import { Timer } from "./Timer";
import { useTimerStore } from "@/app/timer.store";

export const TimerList = () => {
  const timers = useTimerStore((state) => state.timers);

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {timers.map((timer) => (
        <Timer key={timer.id} timer={timer} />
      ))}
    </div>
  );
};
