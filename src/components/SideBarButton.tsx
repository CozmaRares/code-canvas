import { useDraggable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodeBlockType, codeBlocks } from "@/lib/code-block";
import CodeBlockPreview from "./blocks/CodeBlockPreview";
import { ComponentJSX } from "@/lib/helper-types";

type Props = {
  type: CodeBlockType;
};

const SideBarButton: ComponentJSX<Props> = ({ type }) => {
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
      className={cn("h-fit w-fit cursor-grab border-none p-2 transition-none", {
        "ring-2 ring-primary": draggable.isDragging,
      })}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div className={cn({ "opacity-0": draggable.isDragging })}>
        <CodeBlockPreview
          orientation={codeBlocks[type].orientation}
          {...codeBlocks[type].previewProps}
        />
      </div>
    </Button>
  );
};

export default SideBarButton;
