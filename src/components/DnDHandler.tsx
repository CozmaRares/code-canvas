import { Active, Over, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { ComponentJSX } from "@/lib/helper-types";
import store from "@/lib/store";
import { CodeBlockType } from "@/lib/code-block";

const DnDHandler: ComponentJSX<unknown> = () => {
  const [active, setActive] = useState<Active | null>(null);
  const [over, setOver] = useState<Over | null>(null);
  const { toast } = useToast();

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
              description: "Could not add to expression",
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

  return <></>;
};

export default DnDHandler;
