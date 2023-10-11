import { createContext, useContext, useState } from "react";
type EditorBlocksContextType = {
  blocks: unknown[];
  addBlock: (block: unknown, index?: number) => void;
};

const EditorBlocksContext = createContext<EditorBlocksContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const EditorBlocksContextProvider = ({ children }: Props) => {
  const [blocks, setBlocks] = useState<unknown[]>([]);

  const addBlock = (block: unknown, index?: number) =>
    setBlocks(prev => {
      const newBlocks = [...prev];
      newBlocks.splice(index ?? prev.length, 0, block);
      return newBlocks;
    });

  return (
    <EditorBlocksContext.Provider
      value={{
        blocks: blocks,
        addBlock: addBlock,
      }}
    >
      {children}
    </EditorBlocksContext.Provider>
  );
};

export default EditorBlocksContextProvider;

export function useEditorBlocksContext() {
  const context = useContext(EditorBlocksContext);

  if (context == null)
    throw new Error(
      "useEditorBlocksContext must be used within an EditorBlocksContextProvider",
    );

  return context;
}