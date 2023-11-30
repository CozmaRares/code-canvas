import { Active, useDndMonitor, useDroppable, Over } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { CodeBlockType, codeBlocks, CodeBlockInfo } from "@/lib/code-block";
import EmptyCodeBlock from "@/components/blocks/utils/EmptyBlock";
import { useEffect, useState } from "react";
import store from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import DropArea from "./DropArea";
import { ComponentJSX } from "@/lib/helper-types";

const Editor: ComponentJSX<unknown> = () => {
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

      const isEditor = over.data.current?.isEditor;

      // drop over editor
      if (isEditor) {
        const type = active.data.current!.type as CodeBlockType;

        return store.tryToAddBlock(type)
          ? null
          : toast({
              title: "Editor error",
              description: "Cannot drop horizontal blocks in Editor",
              variant: "destructive",
            });
      }

      const isCodeBlock = over.data.current?.isCodeBlock;
      const isTopDrop = over.data.current?.isTopDrop;
      const isBottomDrop = over.data.current?.isBottomDrop;
      const isRightDrop = over.data.current?.isRightDrop;
      const isInnerDrop = over.data.current?.isInnerDrop;

      // drop above block
      if (isCodeBlock && isTopDrop) {
        const dropIdx = store.indexOf(over.data.current!.id);
        const type = active.data.current!.type as CodeBlockType;
        return store.tryToAddBlock(type, dropIdx)
          ? null
          : toast({
              title: "Editor error",
              description: "Cannot drop horizontal blocks in Editor",
              variant: "destructive",
            });
      }

      // drop below block
      if (isCodeBlock && isBottomDrop) {
        const dropIdx = store.indexOf(over.data.current!.id);
        const type = active.data.current!.type as CodeBlockType;
        return store.tryToAddBlock(type, dropIdx + 1)
          ? null
          : toast({
              title: "Editor error",
              description: "Cannot drop horizontal blocks in Editor",
              variant: "destructive",
            });
      }

      // drop over block with expression
      if (isCodeBlock && isRightDrop) {
        const type = active.data.current!.type as CodeBlockType;
        const parentID = over.data.current!.id as string;
        return store.tryToAddToExpression(parentID, type)
          ? null
          : toast({
              title: "Editor erorr",
              description: "Could not add child",
              variant: "destructive",
            });
      }

      // drop over block with statements
      if (isCodeBlock && isInnerDrop) {
        const type = active.data.current!.type as CodeBlockType;
        const parentID = over.data.current!.id as string;

        return store.tryToAddStatement(parentID, type)
          ? null
          : toast({
              title: "Editor erorr",
              description: "Could not add statement",
              variant: "destructive",
            });
      }
    },
  });

  return (
    <ul
      ref={droppable.setNodeRef}
      className={cn(
        "relative h-fit min-h-full min-w-[350px] space-y-2 rounded-md bg-background p-4 pb-8 [--shadow-col:#02061780] [box-shadow:_0px_0px_20px_10px_var(--shadow-col)] dark:[--shadow-col:#f8fafc3d]",
        droppable.isOver && "ring-2 ring-primary/40",
      )}
    >
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
      {droppable.isOver && <EmptyCodeBlock />}
    </ul>
  );
};

export default Editor;

const CodeBlockWrapper: ComponentJSX<CodeBlockInfo> = ({ id, type }) => {
  const CodeBlock = codeBlocks[type].block;

  // TODO: make dropareas lines

  return (
    <div className="relative w-fit">
      <DropArea
        id={`${id}-top`}
        data={{
          type: type,
          id: id,
          isCodeBlock: true,
          isTopDrop: true,
        }}
        className="left-0 right-0 top-0 h-4 rounded-t-lg"
      />
      <DropArea
        id={`${id}-bottom`}
        data={{
          type: type,
          id: id,
          isCodeBlock: true,
          isBottomDrop: true,
        }}
        className="bottom-0 left-0 right-0 h-4 rounded-b-lg"
      />
      <CodeBlock id={id} />
    </div>
  );
};
