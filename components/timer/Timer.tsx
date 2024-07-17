import { useEffect, useState } from "react";
import { Timer as TimerType, useTimerStore } from "../../app/timer.store";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
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
    <div className="flex items-center space-x-4">
      <Card>
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

            <div className="text-2xl font-bold">
              {formatTime(timer.timeLeft)}
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => toggleTimer(timer.id)}
              className="btn rounded-full size-12 p-0"
            >
              {timer.isRunning ? (
                <Pause fill="currentColor" size={14} />
              ) : (
                <Play fill="currentColor" size={14} />
              )}
            </Button>
            <Button
              onClick={() => deleteTimer(timer.id)}
              className="btn btn-danger rounded-full size-12 p-0"
            >
              <Trash2 color="currentColor" size={14} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
