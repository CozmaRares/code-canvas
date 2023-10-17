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
  CodeBlockInfo,
  codeBlocks,
} from "@/components/blocks/utils/code-block";
import EmptyCodeBlock from "@/components/blocks/utils/EmptyBlock";
import { useEffect, useState } from "react";
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

  useDndMonitor({
    onDragStart: e => setActive(e.active),
    onDragMove: e => setOver(e.over),
    onDragEnd: () => {
      if (!active || !over) return;

      const isSideBarButton = active.data.current?.isSideBarButton;
      const isVertical = active.data.current?.orientation == "vertical";
      const isEditor = over.data.current?.isEditor;

      // vertical block from sidebar over editor
      if (isEditor && isSideBarButton)
        if (isVertical) {
          const type = active.data.current!.type as CodeBlockType;
          return store.addBlock(type);
        } else
          return toast({
            title: "Editor error",
            description: "Cannot drop horizontal blocks in Editor",
            variant: "destructive",
          });

      const isCodeBlock = over.data.current?.isCodeBlock;
      const isRightDrop = over.data.current?.isRightDrop;

      console.log({ isCodeBlock, isRightDrop });

      // block from sidebar over block with children
      if (isCodeBlock && isRightDrop) {
        const type = active.data.current!.type as CodeBlockType;
        const parentID = over.data.current!.id as string;

        if (store.addChild(parentID, type) == false)
          return toast({
            title: "Editor erorr",
            description: "Could not add child",
            variant: "destructive",
          });
      }
    },
  });

  return (
    <ul
      ref={droppable.setNodeRef}
      className={cn(
        "relative h-fit min-h-full min-w-[350px] rounded-md bg-background p-4 pb-8 [--shadow-col:#02061780] [box-shadow:_0px_0px_20px_10px_var(--shadow-col)] dark:[--shadow-col:#f8fafc3d]",
        droppable.isOver && "ring-2 ring-primary/40",
      )}
    >
      <AnchorBlock text="Main Program" />
      {!droppable.isOver && store.blocks.length === 0 && (
        <p className="absolute left-0 right-0 top-1/2 mt-12 -translate-y-1/2 text-center text-xl text-muted-foreground">
          Drop here
        </p>
      )}
      {store.blocks.map(block => (
        <CodeBlockWrapper
          key={block.id}
          id={block.id}
          type={block.type}
        />
      ))}
      {droppable.isOver && active?.data.current?.orientation == "vertical" && (
        <EmptyCodeBlock />
      )}
    </ul>
  );
};

export default Editor;

const CodeBlockWrapper = ({ id, type }: CodeBlockInfo) => {
  const rightDrop = useDroppable({
    id: id + "-right",
    data: {
      type: type,
      id: id,
      isCodeBlock: true,
      isRightDrop: true,
    },
  });

  const CodeBlock = codeBlocks[type].block;

  return (
    <div className="relative w-fit">
      <div className="absolute bottom-0 left-0 top-0 z-10 w-4"> </div>
      <div className="absolute left-0 right-0 top-0 z-10 h-4"> </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 h-4"> </div>
      <div
        ref={rightDrop.setNodeRef}
        className={cn(
          "absolute bottom-0 right-0 top-0 z-10 w-4 rounded-r-lg",
          rightDrop.isOver && "bg-black/30",
        )}
      ></div>
      <CodeBlock id={id} />
    </div>
  );
};
