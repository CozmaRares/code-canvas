import store from "./store";
import { VerticalBlockInfo } from "./code-block";
import { ConsoleText } from "@/context/console";
import { NumberBlockModel, numberBlockType } from "./models/number-model";
import {
  VariableNameBlockModel,
  variableNameBlockType,
} from "./models/variable-name-model";
import {
  VariableAssignBlockModel,
  variableAssignBlockType,
} from "./models/variable-assignment-model";
import { OperatorBlockModel } from "./models/operator-model";
import { IfBlockModel, ifBlockType } from "./models/if-model";
import { WhileBlockModel, whileBlockType } from "./models/while-model";
import { PrintBlockModel, printBlockType } from "./models/print-model";
import PythonConverter from "./python-converter";
import { SUPPORTED_OPERATORS } from "./operators";

type Operator = keyof typeof SUPPORTED_OPERATORS;

type VariableMap = Map<string, number>;

type InterpreterResult =
  | { value: number; error?: undefined }
  | { error: string; value?: undefined };

export default class Interpreter {
  private variables: VariableMap = new Map();
  private addConsoleText: (consoleText: ConsoleText) => void = () => {};
  private printQueue: ConsoleText[] = [];

  private runStatements(
    statements: VerticalBlockInfo[],
    firstLevel = false,
  ): string {
    for (const statement of statements) {
      let result: string;

      switch (statement.type) {
        case variableAssignBlockType:
          result = this.handleVariableAssign(statement.id, firstLevel);
          break;
        case ifBlockType:
          result = this.handleIfStatement(statement.id, firstLevel);
          break;
        case whileBlockType:
          result = this.handleWhileStatement(statement.id, firstLevel);
          break;
        case printBlockType:
          result = this.handlePrintStatement(statement.id, firstLevel);
          break;
        default:
          throw new Error(
            "UNREACHABLE CODE IN Interpreter.runStatements(), type: " +
              statement.type,
          );
      }

      if (result !== "") return result;
    }

    return "";
  }

  async start(
    addConsoleText: (consoleText: ConsoleText) => void = () => {},
  ): Promise<boolean> {
    this.addConsoleText = addConsoleText;
    this.variables = new Map();
    this.printQueue = [];

    const result = this.runStatements(store.blocks, true);

    if (result !== "") {
      this.addConsoleText({ type: "err", text: result });
      return false;
    }

    return true;
  }

  private getNumber(model: NumberBlockModel): InterpreterResult {
    const value = parseInt(model.props.number);
    return isNaN(value)
      ? { error: "Error: Value is not a number." }
      : { value };
  }

  private getVariableValue(model: VariableNameBlockModel): InterpreterResult {
    const value = this.variables.get(model.props.variable);
    return value === undefined
      ? {
          error: `Error: Variable '${model.props.variable}' does not exist.`,
        }
      : { value };
  }

  private parseExpression(model: VariableAssignBlockModel): InterpreterResult {
    if (model.expressionList.length < 1)
      return { error: "Error: Could not compute value." };

    const getValue = (
      model: NumberBlockModel | VariableNameBlockModel | OperatorBlockModel,
    ): InterpreterResult =>
      model.type == numberBlockType
        ? this.getNumber(model)
        : model.type == variableNameBlockType
        ? this.getVariableValue(model as VariableNameBlockModel)
        : {
            error: "Error: Assignment must begin with a number of variable.",
          };

    const expressionList = model.expressionList.map(child =>
      store.getModel(child.id),
    ) as Array<NumberBlockModel | VariableNameBlockModel | OperatorBlockModel>;
    const firstChild = expressionList.shift()!;
    let result = getValue(firstChild);

    if (result.error !== undefined) return { error: result.error };

    let value = result.value;

    let operator: Operator | null = null;

    for (const expr of expressionList) {
      if (operator == null)
        if (expr.type != "operator")
          return { error: "Error: Was expecting an operator." };
        else {
          operator = expr.props.operator as Operator;

          if (!(operator in SUPPORTED_OPERATORS))
            return {
              error: `Error: Unknown operator '${operator}'.`,
            };

          continue;
        }
      else {
        result = getValue(expr);
        if (result.error !== undefined) return { error: result.error };

        value = SUPPORTED_OPERATORS[operator](value, result.value);

        operator = null;
      }
    }

    return { value };
  }

  private handleVariableAssign(id: string, firstLevel: boolean): string {
    const model = store.getModel(id) as VariableAssignBlockModel;
    const variable = model.props.variable;

    if (variable.length < 1)
      return "Error: Cannot assign anything to an empty variable.";

    const { error, value } = this.parseExpression(model);
    if (error !== undefined) return error;

    if (firstLevel)
      this.addConsoleText({
        type: "in",
        text: PythonConverter.assignment(model).join(""),
      });

    this.variables.set(variable, value);

    return "";
  }

  private handleIfStatement(id: string, firstLevel: boolean): string {
    const model = store.getModel(id) as IfBlockModel;
    if (model.expressionList.length < 1)
      return "Error: Expected to check a variable's value.";

    const variable = model.expressionList[0];
    const result = this.getVariableValue(
      store.getModel(variable.id) as VariableNameBlockModel,
    );
    if (result.error !== undefined) return result.error;

    let statementsResult = "";

    if (result.value != 0)
      statementsResult = this.runStatements(model.statements);

    if (firstLevel && statementsResult == "") {
      PythonConverter.if(model).forEach(line =>
        this.addConsoleText({
          type: "in",
          text: line,
        }),
      );

      this.printQueue.forEach(print => this.addConsoleText(print));
      this.printQueue = [];
    }

    return statementsResult;
  }

  private handleWhileStatement(id: string, firstLevel: boolean): string {
    const model = store.getModel(id) as WhileBlockModel;
    if (model.expressionList.length < 1)
      return "Error: Expected to check a variable's value.";

    const variable = model.expressionList[0];

    while (true) {
      const result = this.getVariableValue(
        store.getModel(variable.id) as VariableNameBlockModel,
      );
      if (result.error !== undefined) return result.error;

      if (result.value == 0) break;

      const statementsResult = this.runStatements(model.statements);

      if (statementsResult != "") return statementsResult;
    }

    if (firstLevel) {
      PythonConverter.while(model).forEach(line =>
        this.addConsoleText({
          type: "in",
          text: line,
        }),
      );

      this.printQueue.forEach(print => this.addConsoleText(print));
      this.printQueue = [];
    }

    return "";
  }

  private handlePrintStatement(id: string, firstLevel: boolean): string {
    const model = store.getModel(id) as PrintBlockModel;
    if (model.expressionList.length < 1)
      return "Error: Expected to print a variable's value.";

    const variable = model.expressionList[0];
    const variableModel = store.getModel(variable.id) as VariableNameBlockModel;
    const result = this.getVariableValue(variableModel);
    if (result.error !== undefined) return result.error;

    if (firstLevel) {
      this.addConsoleText({
        type: "in",
        text: PythonConverter.print(model).join(""),
      });
      this.addConsoleText({
        type: "out",
        text: `Value of '${variableModel.props.variable}' is ${result.value}`,
      });
    } else
      this.printQueue.push({
        type: "out",
        text: `Value of '${variableModel.props.variable}' is ${result.value}`,
      });

    return "";
  }
}
