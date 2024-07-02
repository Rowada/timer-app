import React, { useState } from "react";
import { useTimerStore } from "../../app/timer.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const AddTimerForm: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const addTimer = useTimerStore((state) => state.addTimer);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setTime((prevTime) => ({
  //     ...prevTime,
  //     [name]: Number(value),
  //   }));
  // };

  const handleSubmit = () => {
    const duration = (hours * 3600 + minutes * 60 + seconds) * 1000;
    addTimer(duration);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <Input
          type="text"
          value={String(hours).padStart(2, "0")}
          name="hrs"
          onChange={(e) => setHours(Number(e.target.value))}
        />
        <p className="text-lg">:</p>
        <Input
          type="text"
          value={String(minutes).padStart(2, "0")}
          name="mins"
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
        <p className="text-lg">:</p>
        <Input
          type="text"
          value={String(seconds).padStart(2, "0")}
          name="secs"
          onChange={(e) => setSeconds(Number(e.target.value))}
        />
      </div>
      <Button onClick={handleSubmit} className="btn-success btn">
        Add Timer
      </Button>
    </div>
  );
};
