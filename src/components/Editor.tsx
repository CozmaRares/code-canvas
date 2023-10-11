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
    <main className="flex h-full w-full bg-[url(/paper.svg)] p-8 dark:bg-[url(/paper-dark.svg)]">
      <ul
        ref={droppable.setNodeRef}
        className={cn(
          "relative w-[350px] space-y-[4px] rounded-md bg-background p-4",
          {
            "ring-2 ring-primary/20": droppable.isOver,
          },
        )}
      >
        <AnchorBlock text="Main Program" />
        {!droppable.isOver && blocks.length === 0 && (
          <p className="absolute left-0 right-0 top-1/2 mt-12 -translate-y-1/2 text-center text-xl text-muted-foreground">
            Drop here
          </p>
        )}
      </ul>
    </main>
  );
};

export default Editor;
