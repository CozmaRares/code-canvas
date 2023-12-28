import { ComponentJSX, cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  data: Record<string, unknown>;
  className?: string;
};

const DropArea: ComponentJSX<Props> = ({ id, data, className }) => {
  const droppable = useDroppable({ id, data });

  return (
    <div
      ref={droppable.setNodeRef}
      className={cn(
        "absolute z-10",
        className,
        droppable.isOver && "bg-black/50 dark:bg-white/50",
      )}
    />
  );
};

export default DropArea;
