import {
  type Active,
  useDndMonitor,
  useDroppable,
  type Over,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import AnchorBlock from "@/components/blocks/utils/AnchorBlock";
import {
  type CodeBlockType,
  codeBlocks,
} from "@/components/blocks/utils/code-block";
import EmptyCodeBlock from "@/components/blocks/utils/EmptyBlock";
import { Fragment, useEffect, useState } from "react";
import store from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

const Editor = () => {
  const [, setRender] = useState(false);
  const [active, setActive] = useState<Active | null>(null);
  const [over, setOver] = useState<Over | null>(null);
  const { toast } = useToast();

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isEditor: true,
    },
  });

  useEffect(() => {
    store.rerender = () => setRender(prev => !prev);

    return () => {
      store.rerender = () => {};
    };
  }, [setRender]);

  const resetDragElements = () => {
    setActive(null);
    setOver(null);
  };

  useDndMonitor({
    onDragStart: e => setActive(e.active),
    onDragMove: e => setOver(e.over),
    onDragEnd: () => {
      if (!active || !over) return resetDragElements();

      const isSideBarButton = active.data.current?.isSideBarButton;
      const isVertical = active.data.current?.orientation == "vertical";
      const isEditor = over.data.current?.isEditor;

      // vertical block from sidebar over editor
      if (isEditor && isSideBarButton)
        if (isVertical) {
          const type = active.data.current!.type as CodeBlockType;
          store.addBlock(type);
          return;
        } else
          return toast({
            title: "Editor error",
            description: "Cannot drop horizontal blocks in Editor",
            variant: "destructive",
          });

      resetDragElements();
    },
    onDragCancel: resetDragElements,
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
      {droppable.isOver && active?.data.current?.orientation == "vertical" && (
        <EmptyCodeBlock
          topSlot
          bottomSlot
        />
      )}
    </ul>
  );
};

export default Editor;
