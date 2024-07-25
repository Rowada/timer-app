import formatDuration from "@/utils/formatDuration";
import { formatTime } from "@/utils/formatTime";
import clsx from "clsx";
import { GripVertical, Pause, Play, Repeat, Trash2 } from "lucide-react";
import { Timer as TimerType, useTimerStore } from "../../app/timer.store";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { CircularTimer } from "./CircularTimer";
import { useState } from "react";
import { Input } from "../ui/input";

type TimerProps = {
  timer: TimerType;
  dragHandleListeners: any;
  dragHandleAttributes: any;
};

export const Timer: React.FC<TimerProps> = ({
  timer,
  dragHandleListeners,
  dragHandleAttributes,
}) => {
  const deleteTimer = useTimerStore((state) => state.deleteTimer);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);
  const repeatTimer = useTimerStore((state) => state.repeatTimer);
  const updateTimerName = useTimerStore((state) => state.updadteTimerName);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(timer.timerName);

  const handleNameChange = () => {
    updateTimerName(timer.id, newName);
    setIsEditing(false);
  };

  return (
    <Card className="p-3 relative h-[478px]">
      <Button
        variant={"outline"}
        {...dragHandleListeners}
        {...dragHandleAttributes}
        className="size-10 p-0 absolute top-3 right-3"
      >
        <GripVertical />
      </Button>
      <CardTitle className="flex items-center justify-center h-10">
        {isEditing ? (
          <Input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleNameChange}
          />
        ) : (
          <span onClick={() => setIsEditing(true)}>{timer.timerName}</span>
        )}
      </CardTitle>
      <div
        className={clsx(
          "relative flex size-[250px] flex-col gap-2 rounded-2xl bg-base-200 p-4 ",
          {
            "brightness-75": timer.timeLeft === 0,
          }
        )}
      >
        <div className="relative flex size-full flex-col items-center justify-center  gap-1">
          <CircularTimer
            className="absolute "
            timeLeft={timer.timeLeft}
            duration={timer.duration}
            width={200}
            radiusRatio={0.9}
          />

          <div className="text-2xl font-bold">{formatTime(timer.timeLeft)}</div>
        </div>
      </div>
      <div className="flex items-center flex-col justify-center gap-2">
        <div className="flex justify-center space-x-5 mb-5">
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

          <Button
            onClick={() => repeatTimer(timer.id)}
            className="btn btn-danger rounded-full mt-10 size-12 p-0"
          >
            <Repeat fill="currentColor" size={20} />
          </Button>

          <Button
            onClick={() => deleteTimer(timer.id)}
            className="btn btn-danger rounded-full text-primary size-12 p-0"
          >
            <Trash2 fill="primary" size={20} />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <DurationDisplay duration={timer.duration} />
        </div>
      </div>
    </Card>
  );
};

const DurationDisplay = ({ duration }) => {
  const text = formatDuration(duration);
  return (
    <>
      <p className="rounded-full bg-accent py-1 px-2">
        {text.hrs}
        <span className="ml-1 text-primary">hours</span>
      </p>
      <p className="rounded-full bg-accent py-1 px-2">
        {text.mins}
        <span className="ml-1 text-primary">mins</span>
      </p>
      <p className="rounded-full bg-accent py-1 px-2">
        {text.secs}
        <span className="ml-1 text-primary">secs</span>
      </p>
    </>
  );
};
