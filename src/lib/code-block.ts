import VariableAssignBlock from "@/components/blocks/VariableAssignBlock";
import VariableNameBlock from "@/components/blocks/VariableNameBlock";
import { CodeBlockPreviewProps } from "@/components/blocks/CodeBlockPreview";
import {
  ifBlockColor,
  numberBlockColor,
  operatorBlockColor,
  printBlockColor,
  variableAssignBlockColor,
  variableNameBlockColor,
  whileBlockColor,
} from "@/components/blocks/utils/colors";
import NumberBlock from "@/components/blocks/NumberBlock";
import OperatorBlock from "@/components/blocks/OperatorBlock";
import IfBlock from "@/components/blocks/IfBlock";
import WhileBlock from "@/components/blocks/WhileBlock";
import PrintBlock from "@/components/blocks/PrintBlock";
import { Model } from "./models/code-block-models";
import {
  VariableAssignBlockModel,
  variableAssignBlockType,
} from "./models/variable-assignment-model";
import {
  VariableNameBlockModel,
  variableNameBlockType,
} from "./models/variable-name-model";
import { NumberBlockModel, numberBlockType } from "./models/number-model";
import { OperatorBlockModel, operatorBlockType } from "./models/operator-model";
import { IfBlockModel, ifBlockType } from "./models/if-model";
import { WhileBlockModel, whileBlockType } from "./models/while-model";
import { PrintBlockModel, printBlockType } from "./models/print-model";
import { ComponentJSX } from "./utils";

export type CodeBlockComponent = ComponentJSX<{
  id: string;
}>;

export type BlockOrientation = "vertical" | "horizontal";

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
