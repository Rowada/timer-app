import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type Timer = {
  id: string;
  duration: number;
  timeLeft: number;
  endAt: number;
  isRunning: boolean;
};

type TimerState = {
  timers: Timer[];
  addTimer: (duration: number) => void;
  toggleTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
};

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      timers: [],
      addTimer: (duration) => {
        set((cur) => ({
          timers: [
            ...cur.timers,
            {
              id: nanoid(10).toString(),
              duration,
              timeLeft: duration,
              endAt: Date.now() + duration,
              isRunning: true,
            },
          ],
        }));
      },

      deleteTimer: (id) => {
        set((cur) => ({
          timers: cur.timers.filter((t) => t.id !== id),
        }));
      },

      toggleTimer(id) {
        set((cur) => ({
          timers: cur.timers.map((timer) => {
            if (timer.id !== id) return timer;

            if (timer.timeLeft === 0 && !timer.isRunning) {
              return {
                ...timer,
                isRunning: true,
                endAt: Date.now() + timer.duration,
                timeLeft: timer.duration,
              };
            }

            return {
              ...timer,
              isRunning: !timer.isRunning,
              endAt: timer.isRunning
                ? timer.endAt
                : Date.now() + timer.timeLeft,
            };
          }),
        }));
      },
    }),
    {
      name: "storage-timer",
    }
  )
);
