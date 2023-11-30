import { DragOverlay, useDndMonitor, Active } from "@dnd-kit/core";
import { useState } from "react";
import { codeBlocks, CodeBlockType } from "@/lib/code-block";
import CodeBlockPreview from "./blocks/CodeBlockPreview";
import { ComponentJSX } from "@/lib/helper-types";

const DragOverlayWrapper: ComponentJSX<unknown> = () => {
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
    console.log("mata");
    const type = draggedItem.data.current!.type as CodeBlockType;
    node = (
      <div className="z-10 cursor-grabbing opacity-50">
        <CodeBlockPreview
          orientation={codeBlocks[type].orientation}
          {...codeBlocks[type].previewProps}
        />
      </div>
    );
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
