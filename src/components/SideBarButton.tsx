import { useDraggable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CodeBlockType } from "@/components/blocks/utils/code-block";
import { codeBlocks } from "@/components/blocks/utils/code-block";

type Props = {
  type: CodeBlockType;
};

const SideBarButton = ({ type }: Props) => {
  const draggable = useDraggable({
    id: `code-block-${type}`,
    data: {
      type,
      isSideBarButton: true,
      orientation: codeBlocks[type].orientation,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn("h-fit w-fit cursor-grab border-none p-2 transition-none", {
        "ring-2 ring-primary": draggable.isDragging,
      })}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div className={cn({ "opacity-0": draggable.isDragging })}>
        {codeBlocks[type].preview()}
      </div>
    </Button>
  );
};

export default SideBarButton;
