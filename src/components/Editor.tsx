import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import AnchorBlock from "@/components/blocks/utils/AnchorBlock";
import { cn } from "@/lib/utils";
import { useEditorBlocksContext } from "./context/editor-blocks";
import EmptyCodeBlock from "./blocks/utils/EmptyCodeBlock";
import codeBlocks, { CodeBlockType } from "./blocks/codeBlocks";

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

      if (isSideBarButton) {
        const type = active.data.current!.type as CodeBlockType;
        addBlock(type);
      }
    },
  });

  return (
    <div className="flex h-full w-full p-8">
      <ul
        ref={droppable.setNodeRef}
        className={cn("space-y-[4px] rounded-md p-4", {
          "ring-2 ring-primary/20": droppable.isOver,
        })}
      >
        <AnchorBlock text="Main Program" />
        {!droppable.isOver && blocks.length === 0 && (
          <p className="mt-12 text-center text-xl text-muted-foreground">
            Drop here
          </p>
        )}
        {droppable.isOver && blocks.length === 0 && <EmptyCodeBlock />}
        {/* FIXME: cannot render stateful components in a list */}
        {blocks.map(block => codeBlocks[block].preview())}
      </ul>
    </div>
  );
};

export default Editor;
