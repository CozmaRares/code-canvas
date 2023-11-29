import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  data: Record<string, unknown>;
  className?: string;
};

const DropArea = ({ id, data, className }: Props) => {
  const droppable = useDroppable({ id, data });

  return (
    <div
      ref={droppable.setNodeRef}
      className={cn(
        "absolute z-10",
        className,
        droppable.isOver && "bg-black/30 dark:bg-white/30",
      )}
    />
  );
};

export default DropArea;