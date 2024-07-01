import { create } from "zustand";

type Timer = {
  id: string;
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
};

type TimerState = {
  timers: Timer[];
  addTimer: (hours: number, minutes: number, seconds: number) => void;
  toggleTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
};

export const useTimerStore = create<TimerState>((set) => ({
  timers: [],
  addTimer: (hours, minutes, seconds) =>
    set((state) => ({
      timers: [
        ...state.timers,
        { id: Date.now().toString(), hours, minutes, seconds, isRunning: true },
      ],
    })),
  toggleTimer: (id) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      ),
    })),

  deleteTimer: (id) =>
    set((state) => ({
      timers: state.timers.filter((timer) => timer.id !== id),
    })),
}));
