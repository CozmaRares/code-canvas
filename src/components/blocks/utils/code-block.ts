import VariableAssignBlock, {
  VariableAssignBlockModel,
  variableAssignBlockType,
} from "@/components/blocks/VariableAssignBlock";
import VariableAssignBlockPreview from "@/components/blocks/preview/VariableAssignBlockPreview";
import { BaseCodeBlockProps } from "./CodeBlock";

export type CodeBlockProps = {
  idx: number;
  blockProps?: BaseCodeBlockProps;
};

export interface GenericCodeBlockModel {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

export type Model = typeof VariableAssignBlockModel;

export const codeBlocks = Object.freeze({
  [variableAssignBlockType]: {
    block: VariableAssignBlock,
    preview: VariableAssignBlockPreview,
    model: VariableAssignBlockModel,
  },
} satisfies Record<
  string,
  {
    block: (props: CodeBlockProps) => JSX.Element;
    preview: (props?: BaseCodeBlockProps) => JSX.Element;
    model: Model;
  }
>);

export type CodeBlockType = keyof typeof codeBlocks;
