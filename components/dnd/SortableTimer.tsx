import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Timer } from "../timer/Timer";

const SortableTimer = ({ id, timer }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Timer
        timer={timer}
        dragHandleAttributes={attributes}
        dragHandleListeners={listeners}
      />
    </div>
  );
};

export default SortableTimer;
