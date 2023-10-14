import Editor from "@/components/Editor";
import SideBar from "@/components/SideBar";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import ImportButton from "@/components/ImportButton";
import ExportButton from "@/components/ExportButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import RunCodeButton from "@/components/RunCodeButton";
import Console from "@/components/Console";
import OutputContextProvider from "./context/output";

const App = () => {
  return (
    <OutputContextProvider>
      <div className="grid h-screen grid-cols-[auto,minmax(0,1fr)] grid-rows-[auto,minmax(0,1fr)]">
        <nav className="col-span-full flex items-center justify-end gap-3 px-6 py-2 shadow shadow-black dark:shadow-white">
          <h1 className="mr-auto text-2xl font-semibold">Code Canvas</h1>
          <RunCodeButton />
          <ImportButton />
          <ExportButton />
          <ThemeSwitch />
        </nav>
        <DndContext>
          <SideBar />
          <main className="flex h-full w-full justify-between overflow-y-auto bg-[url(/paper.svg)] p-8 dark:bg-[url(/paper-dark.svg)]">
            <Editor />
            <Console />
          </main>
          <DragOverlayWrapper />
        </DndContext>
      </div>
    </OutputContextProvider>
  );
};

export default App;
