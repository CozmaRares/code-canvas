import Editor from "@/components/Editor";
import SideBar from "@/components/SideBar";
import { DndContext, closestCenter } from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import DownloadButton from "@/components/DownloadButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import RunCodeButton from "@/components/RunCodeButton";
import Console from "@/components/Console";
import ConsoleContextProvider from "./context/console";
import { Toaster } from "./components/ui/toaster";
import ToggleConsoleButton from "./components/ToggleConsoleButton";
import { ComponentJSX } from "./lib/helper-types";

const App: ComponentJSX<unknown> = () => {
  return (
    <>
      <ConsoleContextProvider>
        <div className="grid h-screen grid-cols-[auto,minmax(0,1fr)] grid-rows-[auto,minmax(0,1fr)]">
          <nav className="col-span-full flex items-center justify-end gap-3 border-b border-black px-6 py-2 dark:border-white">
            <h1 className="mr-auto text-2xl font-semibold">Code Canvas</h1>
            <ToggleConsoleButton />
            <RunCodeButton />
            <DownloadButton />
            <ThemeSwitch />
          </nav>
          <DndContext collisionDetection={closestCenter}>
            <SideBar />
            <main className="flex h-full w-full justify-between overflow-y-auto bg-[url(/paper.svg)] p-8 dark:bg-[url(/paper-dark.svg)]">
              <Editor />
              <Console />
            </main>
            <DragOverlayWrapper />
          </DndContext>
        </div>
      </ConsoleContextProvider>
      <Toaster />
    </>
  );
};

export default App;

// TODO: properly check code for naming inconsistencies and use a block's type constant instead of literal
