import { CodeBlockInfoGeneric, VerticalBlockInfo } from "../code-block";
import { GenericCodeBlockModelWithStatements } from "./code-block-models";
import { variableNameBlockType } from "./variable-name-model";

export const whileBlockType = "while" as const;

type WhileBlockProps = Record<string, unknown>;
type ExpressionTypes = typeof variableNameBlockType;

export class WhileBlockModel
  implements GenericCodeBlockModelWithStatements<WhileBlockProps>
{
  id: string;
  type = whileBlockType;
  props: WhileBlockProps;
  expressionAccpetedTypes = Object.freeze([
    variableNameBlockType,
  ] satisfies ExpressionTypes[]);
  expressionList: Array<CodeBlockInfoGeneric<ExpressionTypes>> = [];
  maxExpressionLength = 1;
  statements: Array<VerticalBlockInfo> = [];

  constructor(id: string) {
    this.id = id;
    this.props = {};
  }
}
