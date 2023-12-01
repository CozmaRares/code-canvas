import { GenericCodeBlockModelWithStatements } from "../code-block-models";
import { CodeBlockInfoGeneric, VerticalBlockInfo } from "../code-block";
import { variableNameBlockType } from "./variable-name-model";

export const ifBlockType = "if" as const;

type IfBlockProps = Record<string, unknown>;
type ExpressionTypes = typeof variableNameBlockType;

export class IfBlockModel
  implements GenericCodeBlockModelWithStatements<IfBlockProps>
{
  id: string;
  type = ifBlockType;
  props: IfBlockProps;
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
