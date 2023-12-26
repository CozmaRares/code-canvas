import {
  HorizontalBlockInfo,
  HorizontalBlockType,
  VerticalBlockInfo,
} from "../code-block";
import { VariableNameBlockModel } from "./variable-name-model";
import { NumberBlockModel } from "./number-model";
import { OperatorBlockModel } from "./operator-model";
import { IfBlockModel } from "./if-model";
import { WhileBlockModel } from "./while-model";
import { PrintBlockModel } from "./print-model";
import { VariableAssignBlockModel } from "./variable-assignment-model";

export interface GenericCodeBlockModel<T> {
  id: string;
  type: string;
  props: T;
}

export interface GenericCodeBlockModelWithExpression<T>
  extends GenericCodeBlockModel<T> {
  expressionList: Array<HorizontalBlockInfo>;
  maxExpressionLength: number;
  expressionAccpetedTypes: Readonly<HorizontalBlockType[]>;
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

export type ConcreteModel = Model["prototype"];
