import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import AnchorBlock from "@/components/blocks/utils/AnchorBlock";
import {
  type CodeBlockType,
  codeBlocks,
} from "@/components/blocks/utils/code-block";
import EmptyCodeBlock from "@/components/blocks/utils/EmptyBlock";
import { Fragment, useEffect, useState } from "react";
import store from "@/lib/store";

const Editor = () => {
  const [, setRender] = useState(false);

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isDropArea: true,
    },
  });

  useEffect(() => {
    store.rerender = () => setRender(prev => !prev);

    return () => {
      store.rerender = () => {};
    };
  }, [setRender]);

  useDndMonitor({
    onDragEnd: e => {
      const { active, over } = e;

      if (!active || !over) return;

      const isSideBarButton = active.data.current?.isSideBarButton;

      if (isSideBarButton) {
        const type = active.data.current!.type as CodeBlockType;
        store.addBlock(type);
      }
    },
  });

  return (
    <ul
      ref={droppable.setNodeRef}
      className={cn(
        "relative h-fit min-h-full min-w-[350px] rounded-md bg-background p-4 pb-8 [--shadow-col:#02061780] [box-shadow:_0px_0px_20px_10px_var(--shadow-col)] dark:[--shadow-col:#f8fafc3d]",
        {
          "ring-2 ring-primary/40": droppable.isOver,
        },
      )}
    >
      <AnchorBlock text="Main Program" />
      {!droppable.isOver && store.blocks.length === 0 && (
        <p className="absolute left-0 right-0 top-1/2 mt-12 -translate-y-1/2 text-center text-xl text-muted-foreground">
          Drop here
        </p>
      )}
      {store.blocks.map(({ id, type }) => {
        return <Fragment key={id}>{codeBlocks[type].block({ id })}</Fragment>;
      })}
      {droppable.isOver && <EmptyCodeBlock />}
    </ul>
  );
};

export default Editor;
