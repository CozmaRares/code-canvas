import { DragOverlay, useDndMonitor, type Active } from "@dnd-kit/core";
import { useState } from "react";
import {
  type CodeBlockType,
  computePreviewProps,
} from "@/components/blocks/utils/code-block";
import CodeBlockPreview from "./blocks/CodeBlockPreview";

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
    node = <CodeBlockPreview {...computePreviewProps(type)} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
