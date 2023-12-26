import { CodeBlockInfoGeneric } from "../code-block";
import { GenericCodeBlockModelWithExpression } from "./code-block-models";
import { variableNameBlockType } from "./variable-name-model";

export const printBlockType = "print" as const;

type PrintBlockProps = Record<string, unknown>;
type ExpressionTypes = typeof variableNameBlockType;

export class PrintBlockModel
  implements GenericCodeBlockModelWithExpression<PrintBlockProps>
{
  id: string;
  type = printBlockType;
  props: PrintBlockProps;
  expressionAccpetedTypes = Object.freeze([
    variableNameBlockType,
  ] satisfies ExpressionTypes[]);
  expressionList: Array<CodeBlockInfoGeneric<ExpressionTypes>> = [];
  maxExpressionLength = 1;

  constructor(id: string) {
    this.id = id;
    this.props = {};
  }
}
