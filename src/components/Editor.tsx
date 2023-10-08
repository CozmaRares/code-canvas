import { useDroppable } from "@dnd-kit/core";
import AnchorBlock from "@/components/blocks/utils/AnchorBlock";
import { cn } from "@/lib/utils";
import { useEditorBlocksContext } from "./context/editor-blocks";
import EmptyCodeBlock from "./blocks/utils/EmptyCodeBlock";

const Editor = () => {
  const { blocks, addBlock } = useEditorBlocksContext();

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isDropArea: true,
    },
  });

  return (
    <div className="flex h-full w-full p-8">
      <ul
        ref={droppable.setNodeRef}
        className={cn("rounded-md p-4", {
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
      </ul>
    </div>
  );
};

export default Editor;
