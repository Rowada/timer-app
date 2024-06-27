import React, { useState } from "react";
import { useTimerStore } from "../../app/timer.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const AddTimerForm: React.FC = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 1, seconds: 0 });
  const addTimer = useTimerStore((state) => state.addTimer);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);

  //   setTime((curr) => ({
  //     ...curr,
  //   }));
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    unit: "hours" | "minutes" | "seconds"
  ) => {
    const value = Number(e.target.value);
    console.log(value);

    setTime((prevTime) => ({ ...prevTime, [unit]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <Input
          value={String(time.hours).padStart(2, "0")}
          onChange={handleChange}
          name="hrs"
        />
        <p className="text-lg">:</p>
        <Input
          value={String(time.minutes).padStart(2, "0")}
          onChange={handleChange}
          name="mins"
        />
        <p className="text-lg">:</p>
        <Input
          value={String(time.seconds).padStart(2, "0")}
          onChange={handleChange}
          name="secs"
        />
      </div>
      <Button className="btn-success btn">Add Timer</Button>
    </div>
  );
};
