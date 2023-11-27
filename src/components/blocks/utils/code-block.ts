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
import { valueBlockColor, variableAssignBlockColor } from "@/lib/block-colors";
import NumberBlock, { NumberBlockModel, numberBlockType } from "../NumberBlock";
import OperatorBlock, {
  OperatorBlockModel,
  operatorBlockType,
} from "../OperatorBlock";
import IfBlock, { IfBlockModel, ifBlockType } from "../IfBlock";
import WhileBlock, { WhileBlockModel, whileBlockType } from "../WhileBlock";

export type CodeBlockProps = {
  id: string;
  blockProps?: BaseCodeBlockProps;
};

export interface GenericCodeBlockModel<T> {
  id: string;
  type: string;
  props: T;
}

export interface GenericCodeBlockModelWithChildren<T>
  extends GenericCodeBlockModel<T> {
  children: Array<{ id: string; type: CodeBlockType }>;
  maxChildrenLength: number;
  childrenTypes: Readonly<CodeBlockType[]>;
}

export interface GenericCodeBlockModelWithStatements<T>
  extends GenericCodeBlockModelWithChildren<T> {
  statements: Array<{ id: string; type: CodeBlockType }>;
}

export type Model =
  | typeof VariableAssignBlockModel
  | typeof VariableNameBlockModel
  | typeof NumberBlockModel
  | typeof OperatorBlockModel
  | typeof IfBlockModel
  | typeof WhileBlockModel;

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
      bg: valueBlockColor,
    },
    model: VariableNameBlockModel,
    orientation: "horizontal",
  },
  [numberBlockType]: {
    block: NumberBlock,
    previewProps: {
      text: "number",
      bg: valueBlockColor,
    },
    model: NumberBlockModel,
    orientation: "horizontal",
  },
  [operatorBlockType]: {
    block: OperatorBlock,
    previewProps: {
      text: "operator",
      bg: valueBlockColor,
    },
    model: OperatorBlockModel,
    orientation: "horizontal",
  },
  [ifBlockType]: {
    block: IfBlock,
    previewProps: {
      text: "if",
      bg: valueBlockColor,
    },
    model: IfBlockModel,
    orientation: "vertical",
  },
  [whileBlockType]: {
    block: WhileBlock,
    previewProps: {
      text: "while",
      bg: valueBlockColor,
    },
    model: WhileBlockModel,
    orientation: "vertical",
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

export type CodeBlockInfo = {
  id: string;
  type: CodeBlockType;
};

export const SUPPORTED_OPERATORS = Object.freeze([
  "+",
  "-",
  "/",
  "*",
  "^",
  "=",
  "<",
  ">",
  "<=",
  ">=",
  "!=",
] as const);
