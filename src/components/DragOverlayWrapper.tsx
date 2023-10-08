import { DragOverlay, useDndMonitor, type Active } from "@dnd-kit/core";
import { useState } from "react";
import codeBlocks, { CodeBlockType } from "./blocks/codeBlocks";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: e => {
      setDraggedItem(e.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  let node: JSX.Element | null = null;
  const isSideBarButton = draggedItem?.data.current?.isSideBarButton;

  if (isSideBarButton) {
    const type = draggedItem.data.current!.type as CodeBlockType;
    node = codeBlocks[type].preview();
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
