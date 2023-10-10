import ThemeSwitch from "@/components/ThemeSwitch";
import Editor from "@/components/Editor";
import SideBar from "@/components/SideBar";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import EditorBlocksContextProvider from "@/context/editor-blocks";

const App = () => {
  return (
    <>
      <EditorBlocksContextProvider>
        <div className="flex flex-row">
          <DndContext>
            <SideBar />
            <main className="flex w-full flex-col">
              <Editor />
            </main>
            <DragOverlayWrapper />
          </DndContext>
        </div>
        <ThemeSwitch />
      </EditorBlocksContextProvider>
    </>
  );
};

export default App;
