import React from "react";
// import { Timer } from "./Timer";
import { useTimerStore } from "@/app/timer.store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTimer from "../dnd/SortableTimer";

export const TimerList = () => {
  const timers = useTimerStore((state) => state.timers);
  const updateTimersOrder = useTimerStore((state) => state.updateTimersOrder);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const activeIndex = timers.findIndex((t) => t.id === active.id);
      const overIndex = timers.findIndex((t) => t.id === over.id);

      const newTimers = arrayMove(timers, activeIndex, overIndex);
      updateTimersOrder(newTimers);
    }
  };

  return (
    // <div className="flex justify-center flex-wrap gap-4">
    //   {timers.map((timer) => (
    //     <Timer key={timer.id} timer={timer} />
    //   ))}
    // </div>
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={timers} strategy={verticalListSortingStrategy}>
        <div className="flex justify-center flex-wrap gap-4">
          {timers.map((timer) => (
            <SortableTimer key={timer.id} id={timer.id} timer={timer} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
