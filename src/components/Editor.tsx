import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { useEditorBlocksContext } from "@/context/editor-blocks";
import AnchorBlock from "@/components/blocks/utils/AnchorBlock";

const Editor = () => {
  const { blocks, addBlock } = useEditorBlocksContext();

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: e => {
      const { active, over } = e;

      if (!active || !over) return;

      const isSideBarButton = active.data.current?.isSideBarButton;
    },
  });

  return (
    <div className="flex h-full w-full p-8 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
      <ul
        ref={droppable.setNodeRef}
        className={cn("space-y-[4px] rounded-md p-4 bg-background relative", {
          "ring-2 ring-primary/20": droppable.isOver,
        })}
      >
        <AnchorBlock text="Main Program" />
        {!droppable.isOver && blocks.length === 0 && (
          <p className="mt-12 absolute top-1/2 left-0 right-0 text-center -translate-y-1/2 text-xl text-muted-foreground">
            Drop here
          </p>
        )}
      </ul>
    </div>
  );
};

export default Editor;
