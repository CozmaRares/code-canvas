import { createContext, useContext, useState } from "react";
import { CodeBlockType } from "../blocks/blocks";
type EditorBlocksContextType = {
  blocks: CodeBlockType[];
  addBlock: (index: number, block: CodeBlockType) => void;
};

const EditorBlocksContext = createContext<EditorBlocksContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const EditorBlocksContextProvider = ({ children }: Props) => {
  const [blocks, setBlocks] = useState<CodeBlockType[]>([]);

  const addBlock = (index: number, block: CodeBlockType) =>
    setBlocks(prev => {
      const newBlocks = [...prev];
      newBlocks.splice(index, 0, block);
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
