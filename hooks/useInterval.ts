import { useTimerStore } from "@/app/timer.store";
import { useEffect } from "react";

export const useInterval = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      useTimerStore.setState((state) => ({
        timers: state.timers.map((timer) => {
          if (!timer.isRunning) {
            return timer;
          }

          const timerFinish = () => {
            // const audio = new Audio("/ring.mp3");
            const audio = console.log("Test audio");

            // audio.play();
            return {
              ...timer,
              timeLeft: 0,
              isRunning: false,
            };
          };

          const timeLeft = Math.round(timer.endAt - Date.now());

          if (timeLeft <= 0) {
            return timerFinish();
          }

          return {
            ...timer,
            timeLeft,
          };
        }),
      }));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};
