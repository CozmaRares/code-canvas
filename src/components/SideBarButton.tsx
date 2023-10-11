import { useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CodeBlockType } from "@/components/blocks/utils/code-block";

type Props = {
  type: CodeBlockType;
  blockPreview: () => JSX.Element;
};

const SideBarButton = ({ type, blockPreview }: Props) => {
  const draggable = useDraggable({
    id: `code-block-${type}`,
    data: {
      type,
      isSideBarButton: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "h-fit w-fit cursor-grab border-none p-2 pb-5 transition-none",
        {
          "ring-2 ring-primary": draggable.isDragging,
        },
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div className={cn({ "opacity-0": draggable.isDragging })}>
        {blockPreview()}
      </div>
    </Button>
  );
};

const SideBarButtonDragOverlay = ({ blockPreview }: Props) => (
  <Button
    variant="outline"
    className="cursor-grab"
  >
    {blockPreview()}
  </Button>
);

export { SideBarButton, SideBarButtonDragOverlay };
