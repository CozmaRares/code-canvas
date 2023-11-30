import { VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import store from "./store";
import { NumberBlockModel } from "@/components/blocks/NumberBlock";
import { VariableNameBlockModel } from "@/components/blocks/VariableNameBlock";
import { SUPPORTED_OPERATORS, VerticalBlockInfo } from "./code-block";
import PythonConverter from "./python-converter";
import { IfBlockModel } from "@/components/blocks/IfBlock";
import { WhileBlockModel } from "@/components/blocks/WhileBlock";
import { ConsoleText } from "@/context/console";
import { OperatorBlockModel } from "@/components/blocks/OperatorBlock";
import { PrintBlockModel } from "@/components/blocks/PrintBlock";

type Operator = (typeof SUPPORTED_OPERATORS)[number];

function executeOperation(
  left: number,
  right: number,
  operator: Operator,
): number {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "//":
      return Math.floor(left / right);
    case "%":
      return left % right;
    case "^":
      return left ** right;
    case "=":
      return Number(left == right);
    case "<":
      return Number(left < right);
    case ">":
      return Number(left > right);
    case "<=":
      return Number(left <= right);
    case ">=":
      return Number(left >= right);
    case "!=":
      return Number(left >= right);
    default:
      throw new Error("Unknown operator: " + operator);
  }
}

type VariableMap = Map<string, number>;

type InterpreterResult =
  | { value: number; error?: undefined }
  | { error: string; value?: undefined };

export default class Interpreter {
  private variables: VariableMap = new Map();
  private addConsoleText: (consoleText: ConsoleText) => void = () => {};

  private runStatements(
    statements: VerticalBlockInfo[],
    firstLevel = false,
  ): string {
    for (const statement of statements) {
      let result: string;

      switch (statement.type) {
        case "variable assign":
          result = this.handleVariableAssign(statement.id, firstLevel);
          break;
        case "if":
          result = this.handleIfStatement(statement.id, firstLevel);
          break;
        case "while":
          result = this.handleWhileStatement(statement.id, firstLevel);
          break;
        case "print":
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
    if (model.children.length < 1)
      return { error: "Error: Could not compute value." };

    const getValue = (
      model: NumberBlockModel | VariableNameBlockModel | OperatorBlockModel,
    ): InterpreterResult =>
      model.type == "number"
        ? this.getNumber(model)
        : model.type == "variable name"
        ? this.getVariableValue(model as VariableNameBlockModel)
        : {
            error: "Error: Assignment must begin with a number of variable.",
          };

    const children = model.children.map(child =>
      store.getModel(child.id),
    ) as Array<NumberBlockModel | VariableNameBlockModel | OperatorBlockModel>;
    const firstChild = children.shift()!;
    let result = getValue(firstChild);

    if (result.error !== undefined) return { error: result.error };

    let value = result.value;

    let operator: Operator | null = null;

    for (const child of children) {
      if (operator == null)
        if (child.type != "operator")
          return { error: "Error: Was expecting an operator." };
        else {
          operator = child.props.operator as Operator;

          if (!SUPPORTED_OPERATORS.includes(operator))
            return {
              error: `Error: Operator '${operator}' is not mathematical.`,
            };

          continue;
        }
      else {
        result = getValue(child);
        if (result.error !== undefined) return { error: result.error };

        value = executeOperation(value, result.value, operator);

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
        text: PythonConverter.assignment(id),
      });

    this.variables.set(variable, value);

    return "";
  }

  private handleIfStatement(id: string, firstLevel: boolean): string {
    const model = store.getModel(id) as IfBlockModel;
    if (model.children.length < 1)
      return "Error: Expected to check a variable's value.";

    const variable = model.children[0];
    const result = this.getVariableValue(
      store.getModel(variable.id) as VariableNameBlockModel,
    );
    if (result.error !== undefined) return result.error;

    let statementsResult = "";

    if (result.value != 0)
      statementsResult = this.runStatements(model.statements);

    if (firstLevel && statementsResult == "")
      this.addConsoleText({
        type: "in",
        text: PythonConverter.if(id),
      });

    return statementsResult;
  }

  private handleWhileStatement(id: string, firstLevel: boolean): string {
    const model = store.getModel(id) as WhileBlockModel;
    if (model.children.length < 1)
      return "Error: Expected to check a variable's value.";

    const variable = model.children[0];

    while (true) {
      const result = this.getVariableValue(
        store.getModel(variable.id) as VariableNameBlockModel,
      );
      if (result.error !== undefined) return result.error;

      if (result.value == 0) break;

      const statementsResult = this.runStatements(model.statements);

      if (statementsResult != "") return statementsResult;
    }

    if (firstLevel)
      this.addConsoleText({
        type: "in",
        text: PythonConverter.while(id),
      });

    return "";
  }

  private handlePrintStatement(id: string, firstLevel: boolean): string {
    const model = store.getModel(id) as PrintBlockModel;
    if (model.children.length < 1)
      return "Error: Expected to print a variable's value.";

    const variable = model.children[0];
    const variableModel = store.getModel(variable.id) as VariableNameBlockModel;
    const result = this.getVariableValue(variableModel);
    if (result.error !== undefined) return result.error;

    this.addConsoleText({
      type: "out",
      text: `Value of '${variableModel.props.variable}' is ${result.value}`,
    });

    if (firstLevel)
      this.addConsoleText({
        type: "in",
        text: PythonConverter.print(id),
      });

    return "";
  }
}
