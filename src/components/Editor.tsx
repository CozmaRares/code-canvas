import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { codeBlocks, CodeBlockInfo } from "@/lib/code-block";
import EmptyCodeBlock from "@/components/blocks/utils/EmptyBlock";
import { useEffect, useState } from "react";
import store from "@/lib/store";
import DropArea from "./DropArea";
import { ComponentJSX } from "@/lib/helper-types";

const Editor: ComponentJSX<unknown> = () => {
  const [, setRender] = useState(false);

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

  return (
    <ul
      ref={droppable.setNodeRef}
      className={cn(
        "relative h-fit max-h-full min-h-full min-w-[350px] space-y-2 overflow-auto rounded-md bg-background p-4 pb-8 [--shadow-col:#02061780] [box-shadow:_0px_0px_20px_10px_var(--shadow-col)] dark:[--shadow-col:#f8fafc3d]",
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
        className="-top-2 left-0 right-0 h-2 rounded-lg"
      />
      <DropArea
        id={`${id}-bottom`}
        data={{
          type: type,
          id: id,
          isCodeBlock: true,
          isBottomDrop: true,
        }}
        className="-bottom-2 left-0 right-0 h-2 rounded-lg"
      />
      <CodeBlock id={id} />
    </div>
  );
};
