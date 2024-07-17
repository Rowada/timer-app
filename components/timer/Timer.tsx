import { useEffect, useState } from "react";
import { Timer as TimerType, useTimerStore } from "../../app/timer.store";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { Play, Pause, Trash2, Repeat } from "lucide-react";
import clsx from "clsx";
import { CircularTimer } from "./CircularTimer";
import { formatTime } from "@/utils/formatTime";

type TimerProps = {
  timer: TimerType;
};

export const Timer: React.FC<TimerProps> = ({ timer }) => {
  const deleteTimer = useTimerStore((state) => state.deleteTimer);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);

  return (
    <Card className="p-3">
      <CardTitle className="text-center">NewTimer</CardTitle>
      <div
        className={clsx(
          "relative flex size-[224px] flex-col gap-2 rounded-2xl bg-base-200 p-4",
          {
            "brightness-75": timer.timeLeft === 0,
          }
        )}
      >
        <div className="relative flex size-full flex-col items-center justify-center gap-1">
          <CircularTimer
            className="absolute"
            timeLeft={timer.timeLeft}
            duration={timer.duration}
            width={180}
            radiusRatio={0.9}
          />

          <div className="text-2xl font-bold">{formatTime(timer.timeLeft)}</div>
        </div>
      </div>
      <div className="flex items-center flex-col justify-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => toggleTimer(timer.id)}
            className="btn rounded-full size-12 p-0"
          >
            {timer.isRunning ? (
              <Pause fill="currentColor" size={20} />
            ) : (
              <Play fill="currentColor" size={20} />
            )}
          </Button>

          <Button className="btn btn-danger rounded-full  size-12 p-0">
            <Repeat fill="currentColor" size={20} />
          </Button>

          <Button
            onClick={() => deleteTimer(timer.id)}
            className="btn btn-danger rounded-full text-primary size-12 p-0"
          >
            <Trash2 fill="primary" size={20} />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-primary p-3">
          <span className="rounded-full bg-accent py-1 px-2">00 hours</span>
          <span className="rounded-full bg-accent py-1 px-2">02 mins</span>
          <span className="rounded-full bg-accent py-1 px-2">00 secs</span>
        </div>
      </div>
    </Card>
  );
};
