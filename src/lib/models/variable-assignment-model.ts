import { CodeBlockInfoGeneric } from "../code-block";
import { GenericCodeBlockModelWithExpression } from "../code-block-models";
import { numberBlockType } from "./number-model";
import { operatorBlockType } from "./operator-model";
import { variableNameBlockType } from "./variable-name-model";

export const variableAssignBlockType = "variable assign" as const;

type VariableAssignBlockProps = {
  variable: string;
};
type ExpressionTypes =
  | typeof numberBlockType
  | typeof variableNameBlockType
  | typeof operatorBlockType;

export class VariableAssignBlockModel
  implements GenericCodeBlockModelWithExpression<VariableAssignBlockProps>
{
  id: string;
  type = variableAssignBlockType;
  props: VariableAssignBlockProps;
  expressionAccpetedTypes = Object.freeze([
    numberBlockType,
    variableNameBlockType,
    operatorBlockType,
  ] satisfies ExpressionTypes[]);
  expressionList: Array<CodeBlockInfoGeneric<ExpressionTypes>> = [];
  maxExpressionLength = 3;

  constructor(id: string) {
    this.id = id;
    this.props = { variable: "" };
  }
}
