import Editor from "@/components/Editor";
import SideBar from "@/components/SideBar";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import EditorBlocksContextProvider from "@/context/editor-blocks";
import ImportButton from "./components/ImportButton";
import ExportButton from "./components/ExportButton";
import ThemeSwitch from "./components/ThemeSwitch";

const App = () => {
  return (
    <>
      <EditorBlocksContextProvider>
        <div className="grid h-screen grid-cols-[auto,minmax(0,1fr)] grid-rows-[auto,minmax(0,1fr)]">
          <nav className="col-span-full flex items-center justify-end gap-3 px-6 py-2 shadow shadow-black">
            <h1 className="mr-auto text-2xl font-semibold">Code Canvas</h1>
            <ImportButton />
            <ExportButton />
            <ThemeSwitch />
          </nav>
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
