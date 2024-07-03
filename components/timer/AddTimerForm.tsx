import { formatTimeValue } from "@/components/timer/formatTimeValue";
import React, { useState } from "react";
import { useTimerStore } from "../../app/timer.store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const AddTimerForm: React.FC = () => {
  const [time, setTime] = useState({ hrs: 0, mins: 0, secs: 0 });
  const addTimer = useTimerStore((state) => state.addTimer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: formatTimeValue(value, name === "hrs" ? 23 : 59),
    }));
  };

  const handleSubmit = () => {
    const ms = time.hrs * 3600000 + time.mins * 60000 + time.secs * 1000;

    if (ms < 1000) {
      alert("Please enter a valid time");
      return;
    }

    addTimer(ms);
    setTime({ hrs: 0, mins: 0, secs: 0 });
  };

  return (
    <div className=" flex flex-col gap-4">
      {" "}
      <div className="flex items-center justify-between">
        {["hrs", "mins", "secs"].map((label) => (
          <p className="text-center font-bold w-full" key={label}>
            {label}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <Input
          type="text"
          value={String(time.hrs).padStart(2, "0")}
          name="hrs"
          onChange={handleChange}
        />
        <p className="text-lg">:</p>
        <Input
          type="text"
          value={String(time.mins).padStart(2, "0")}
          name="mins"
          onChange={handleChange}
        />
        <p className="text-lg">:</p>
        <Input
          type="text"
          value={String(time.secs).padStart(2, "0")}
          name="secs"
          onChange={handleChange}
        />
      </div>
      <div className="flex items-end justify-end">
        <Button onClick={handleSubmit} className="btn-success btn">
          Add Timer
        </Button>
      </div>
    </div>
  );
};
