import { VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import store from "./store";
import { NumberBlockModel } from "@/components/blocks/NumberBlock";
import { VariableNameBlockModel } from "@/components/blocks/VariableNameBlock";
import {
  ConcreteModel,
  SUPPORTED_OPERATORS,
} from "@/components/blocks/utils/code-block";
import PythonConverter from "./PythonConverter";
import { IfBlockModel } from "@/components/blocks/IfBlock";

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

export default class Interpreter {
  private variables: VariableMap = new Map();
  private addConsoleText: (type: "in" | "out" | "err", text: string) => void =
    () => {};
  private clearConsole: () => void = () => {};

  private runStatements(statements: ConcreteModel[]): string {
    for (const statement of statements) {
      let result: string;

      switch (statement.type) {
        case "variable assign":
          result = this.handleVariableAssign(statement);
          break;
        case "if":
          result = this.handleIfStatement(statement);
          break;
        case "while":
          result = this.handleWhileStatement(statement);
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
    addConsoleText: (type: "in" | "out" | "err", text: string) => void,
    clearConsole: () => void,
  ) {
    this.addConsoleText = addConsoleText;
    this.clearConsole = clearConsole;
    this.variables = new Map();

    const result = this.runStatements(store.blocks);

    if (result !== "") {
      this.clearConsole();
      this.addConsoleText("err", result);
    }
  }

  private getNumber(model: NumberBlockModel) {
    const value = parseInt(model.props.number);
    return isNaN(value)
      ? { error: "Error: Value is not a number." }
      : { value };
  }

  private getVariableValue(model: VariableNameBlockModel) {
    const value = this.variables.get(model.props.variable);
    return value === undefined
      ? {
          error: `Error: Variable '${model.props.variable}' does not exist.`,
        }
      : { value };
  }

  private parseExpression(model: VariableAssignBlockModel) {
    if (model.children.length < 1)
      return { error: "Error: Could not compute value." };

    // HACK: used type of children array before definition
    const getValue = (model: (typeof children)[number]) =>
      model.type == "number"
        ? this.getNumber(model)
        : model.type == "variable name"
        ? this.getVariableValue(model as VariableNameBlockModel)
        : {
            error: "Error: Assignment must begin with a number of variable.",
          };

    const children = model.children.map(child => store.getModel(child.id));
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

  private handleVariableAssign(model: VariableAssignBlockModel): string {
    const variable = model.props.variable;

    if (variable.length < 1)
      return "Error: Cannot assign anything to an empty variable.";

    const { error, value } = this.parseExpression(model);
    if (error !== undefined) return error;

    this.variables.set(variable, value);
    this.addConsoleText("in", PythonConverter.toPython.assignment(model));

    // TODO: add print statements (only for variables)
    this.addConsoleText("out", `${variable}=${value}`);

    return "";
  }

  private handleIfStatement(model: IfBlockModel): string {
    if (model.children.length < 1)
      return "Error: Cannot assign anything to an empty variable.";

    const variable = model.children[0];
    const result = this.getVariableValue(
      store.getModel(variable.id) as VariableNameBlockModel,
    );
    if (result.error !== undefined) return result.error;

    if (result.value != 0)
      return this.runStatements(
        model.statements.map(({ id }) => store.getModel(id)),
      );

    return "";
  }

  private handleWhileStatement(model: WhileBlockModel): string {
    if (model.children.length < 1)
      return "Error: Cannot assign anything to an empty variable.";

    const variable = model.children[0];

    while (true) {
      const result = this.getVariableValue(
        store.getModel(variable.id) as VariableNameBlockModel,
      );
      if (result.error !== undefined) return result.error;

      if (result.value == 0) break;

      const statementsResult = this.runStatements(
        model.statements.map(({ id }) => store.getModel(id)),
      );

      if (statementsResult != "") return statementsResult;
    }

    return "";
  }
}
