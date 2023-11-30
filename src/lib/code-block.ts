import VariableAssignBlock, {
  VariableAssignBlockModel,
  variableAssignBlockType,
} from "@/components/blocks/VariableAssignBlock";
import VariableNameBlock, {
  VariableNameBlockModel,
  variableNameBlockType,
} from "@/components/blocks/VariableNameBlock";
import type { CodeBlockPreviewProps } from "@/components/blocks/CodeBlockPreview";
import {
  ifBlockColor,
  numberBlockColor,
  operatorBlockColor,
  printBlockColor,
  variableAssignBlockColor,
  variableNameBlockColor,
  whileBlockColor,
} from "@/components/blocks/utils/colors";
import NumberBlock, {
  NumberBlockModel,
  numberBlockType,
} from "@/components/blocks/NumberBlock";
import OperatorBlock, {
  OperatorBlockModel,
  operatorBlockType,
} from "@/components/blocks/OperatorBlock";
import IfBlock, {
  IfBlockModel,
  ifBlockType,
} from "@/components/blocks/IfBlock";
import WhileBlock, {
  WhileBlockModel,
  whileBlockType,
} from "@/components/blocks/WhileBlock";
import PrintBlock, {
  PrintBlockModel,
  printBlockType,
} from "@/components/blocks/PrintBlock";
import { ComponentJSX } from "./helper-types";

export type CodeBlockComponent = ComponentJSX<{
  id: string;
}>;

export interface GenericCodeBlockModel<T> {
  id: string;
  type: string;
  props: T;
}

export interface GenericCodeBlockModelWithExpression<T>
  extends GenericCodeBlockModel<T> {
  children: Array<HorizontalBlockInfo>;
  maxChildrenLength: number;
  childrenTypes: Readonly<CodeBlockType[]>;
}

export interface GenericCodeBlockModelWithStatements<T>
  extends GenericCodeBlockModelWithExpression<T> {
  statements: Array<VerticalBlockInfo>;
}

export type Model =
  | typeof VariableAssignBlockModel
  | typeof VariableNameBlockModel
  | typeof NumberBlockModel
  | typeof OperatorBlockModel
  | typeof IfBlockModel
  | typeof WhileBlockModel
  | typeof PrintBlockModel;

export type BlockOrientation = "vertical" | "horizontal";

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
      bg: variableNameBlockColor,
    },
    model: VariableNameBlockModel,
    orientation: "horizontal",
  },
  [numberBlockType]: {
    block: NumberBlock,
    previewProps: {
      text: "number",
      bg: numberBlockColor,
    },
    model: NumberBlockModel,
    orientation: "horizontal",
  },
  [operatorBlockType]: {
    block: OperatorBlock,
    previewProps: {
      text: "operator",
      bg: operatorBlockColor,
    },
    model: OperatorBlockModel,
    orientation: "horizontal",
  },
  [ifBlockType]: {
    block: IfBlock,
    previewProps: {
      text: "if",
      bg: ifBlockColor,
    },
    model: IfBlockModel,
    orientation: "vertical",
  },
  [whileBlockType]: {
    block: WhileBlock,
    previewProps: {
      text: "while",
      bg: whileBlockColor,
    },
    model: WhileBlockModel,
    orientation: "vertical",
  },
  [printBlockType]: {
    block: PrintBlock,
    previewProps: {
      text: "print",
      bg: printBlockColor,
    },
    model: PrintBlockModel,
    orientation: "vertical",
  },
} satisfies Record<
  string,
  {
    block: CodeBlockComponent;
    previewProps: Omit<CodeBlockPreviewProps, "orientation">;
    model: Model;
    orientation: BlockOrientation;
  }
>);

export type CodeBlockInfoGeneric<T> = {
  id: string;
  type: T;
};

export type CodeBlockType = keyof typeof codeBlocks;
export type CodeBlockInfo = CodeBlockInfoGeneric<CodeBlockType>;

type FilteredBlockType<T, Orientation extends BlockOrientation> = {
  [K in keyof T]: T[K] extends { orientation: Orientation } ? K : never;
}[keyof T];

export type HorizontalBlockType = FilteredBlockType<
  typeof codeBlocks,
  "horizontal"
>;
export type HorizontalBlockInfo = CodeBlockInfoGeneric<HorizontalBlockType>;

export type VerticalBlockType = FilteredBlockType<
  typeof codeBlocks,
  "vertical"
>;
export type VerticalBlockInfo = CodeBlockInfoGeneric<VerticalBlockType>;

export const SUPPORTED_OPERATORS = Object.freeze([
  "+",
  "-",
  "/",
  "//",
  "%",
  "*",
  "^",
  "=",
  "<",
  ">",
  "<=",
  ">=",
  "!=",
] as const);
