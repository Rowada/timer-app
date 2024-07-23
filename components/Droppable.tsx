import { useDroppable } from "@dnd-kit/core";

const Droppable: React.FC<{ id: string }> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
};

export default Droppable;
