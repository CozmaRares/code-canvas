import VariableAssignBlock, {
  VariableAssignBlockModel,
  variableAssignBlockType,
} from "@/components/blocks/VariableAssignBlock";
import { BaseCodeBlockProps } from "./CodeBlock";
import VariableNameBlock, {
  VariableNameBlockModel,
  variableNameBlockType,
} from "../VariableNameBlock";
import { CodeBlockPreviewProps } from "../CodeBlockPreview";
import { variableAssignBlockColor } from "@/lib/block-colors";

export type CodeBlockProps = {
  id: string;
  blockProps?: BaseCodeBlockProps;
};

export interface GenericCodeBlockModel<T> {
  id: string;
  type: string;
  props: T;
  childrenIDs?: string[];
}

export type Model =
  | typeof VariableAssignBlockModel
  | typeof VariableNameBlockModel;

export type ConcreteModel = Model["prototype"];

export const codeBlocks = Object.freeze({
  [variableAssignBlockType]: {
    block: VariableAssignBlock,
    previewProps: {
      text: "let variable",
      bg: variableAssignBlockColor,
    },
    model: VariableAssignBlockModel,
    orientation: "vertical",
  },
  [variableNameBlockType]: {
    block: VariableNameBlock,
    previewProps: {
      text: "variable",
    },
    model: VariableNameBlockModel,
    orientation: "horizontal",
  },
} satisfies Record<
  string,
  {
    block: (props: CodeBlockProps) => JSX.Element;
    previewProps: CodeBlockPreviewProps;
    model: Model;
    orientation: "horizontal" | "vertical";
  }
>);

export type CodeBlockType = keyof typeof codeBlocks;

export function computePreviewProps(type: CodeBlockType) {
  const slots =
    codeBlocks[type].orientation == "horizontal"
      ? { leftSlot: true, rightSlot: true }
      : { topSlot: true, bottomSlot: true };
  return { ...codeBlocks[type].previewProps, ...slots };
}
