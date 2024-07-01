import React, { useState } from "react";
import { useTimerStore } from "../../app/timer.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const AddTimerForm: React.FC = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 1, seconds: 0 });
  const addTimer = useTimerStore((state) => state.addTimer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: Number(value),
    }));
  };

  const handleSubmit = () => {
    addTimer(time.hours, time.minutes, time.seconds);
    // setTime({ hours: 0, minutes: 1, seconds: 0 });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <Input
          type="text"
          value={String(time.hours).padStart(2, "0")}
          name="hrs"
          onChange={handleChange}
        />
        <p className="text-lg">:</p>
        <Input
          type="text"
          value={String(time.minutes).padStart(2, "0")}
          name="mins"
          onChange={handleChange}
        />
        <p className="text-lg">:</p>
        <Input
          type="text"
          value={String(time.seconds).padStart(2, "0")}
          name="secs"
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleSubmit} className="btn-success btn">
        Add Timer
      </Button>
    </div>
  );
};
