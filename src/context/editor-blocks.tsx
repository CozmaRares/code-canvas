import type {
  CodeBlockContextGenericType,
  CodeBlockType,
} from "@/components/blocks/utils/code-block";
import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid/non-secure";

type CodeBlock = {
  id: string;
  block: CodeBlockContextGenericType;
};

export type EditorBlocksContextType = {
  blocks: CodeBlock[];
  setProps: (idx: number, props: Record<string, unknown>) => void;
  getProp: (idx: number, prop: string) => unknown | null;
  addBlock: (type: CodeBlockType, index?: number) => void;
};

const EditorBlocksContext = createContext<EditorBlocksContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const EditorBlocksContextProvider = ({ children }: Props) => {
  const [blocks, setBlocks] = useState<CodeBlock[]>([]);

  const addBlock = (type: CodeBlockType, index?: number) =>
    setBlocks(prev => {
      const newBlocks = [...prev];
      const newBlock = {
        id: nanoid(),
        block: {
          type,
          props: {},
        },
      };
      newBlocks.splice(index ?? prev.length, 0, newBlock);
      return newBlocks;
    });

  const getProp = (idx: number, prop: string) => blocks[idx].block.props[prop];

  const setProps = (idx: number, props: Record<string, unknown>) =>
    setBlocks(prev => {
      const newBlocks = [...prev];

      const {
        id,
        block: { type, props: oldProps },
      } = newBlocks[idx];

      newBlocks[idx] = {
        id,
        block: { type, props: { ...oldProps, ...props } },
      };

      console.log(newBlocks);

      return newBlocks;
    });

  return (
    <EditorBlocksContext.Provider
      value={{
        blocks,
        addBlock,
        getProp,
        setProps,
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
