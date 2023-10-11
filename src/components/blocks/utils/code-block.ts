import { EditorBlocksContextType } from "@/context/editor-blocks";
import VariableAssignBlock, {
  VariableAssignProps,
} from "../VariableAssignBlock";
import VariableAssignBlockPreview from "../preview/VariableAssignBlockPreview";

export type CodeBlockProps = {
  idx: number;
  setProps: EditorBlocksContextType["setProps"];
  getProp: EditorBlocksContextType["getProp"];
};

export type CodeBlockContextType = {
  type: "variable assign";
  props: VariableAssignProps;
};

export type CodeBlockType = CodeBlockContextType["type"];

export type CodeBlockContextGenericType = {
  type: CodeBlockType;
  props: Record<string, unknown>;
};

export const codeBlocks = Object.freeze({
  "variable assign": {
    block: VariableAssignBlock,
    preview: VariableAssignBlockPreview,
  },
} satisfies Record<
  CodeBlockType,
  { block: (props: CodeBlockProps) => JSX.Element; preview: () => JSX.Element }
>);
