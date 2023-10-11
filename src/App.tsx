import Editor from "@/components/Editor";
import SideBar from "@/components/SideBar";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import EditorBlocksContextProvider from "@/context/editor-blocks";
import Header from "@/components/Header";

const App = () => {
  return (
    <>
      <EditorBlocksContextProvider>
        <div className="grid h-screen grid-cols-[auto,minmax(0,1fr)] grid-rows-[auto,minmax(0,1fr)]">
          <Header />
          <DndContext>
            <SideBar />
            <Editor />
            <DragOverlayWrapper />
          </DndContext>
        </div>
      </EditorBlocksContextProvider>
    </>
  );
};

export default App;
