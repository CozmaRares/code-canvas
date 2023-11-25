import { VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import store from "./store";
import { NumberBlockModel } from "@/components/blocks/NumberBlock";
import { VariableNameBlockModel } from "@/components/blocks/VariableNameBlock";
import { SUPPORTED_OPERATORS } from "@/components/blocks/utils/code-block";
import PythonConverter from "./PythonConverter";

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

function parseExpression(
  model: VariableAssignBlockModel,
  variables: VariableMap,
) {
  if (model.children.length < 1)
    return { error: "Error: Could not compute value." };

  const getNumber = (model: NumberBlockModel) => {
    const value = parseInt(model.props.number);
    return isNaN(value)
      ? { error: "Error: Value is not a number." }
      : { value };
  };

  const getVariableValue = (model: VariableNameBlockModel) => {
    const value = variables.get(model.props.variable);
    return value === undefined
      ? {
          error: `Error: Variable '${model.props.variable}' does not exist.`,
        }
      : { value };
  };

  // HACK: used type of children array before definition
  const getValue = (model: (typeof children)[number]) =>
    model.type == "number"
      ? getNumber(model)
      : model.type == "variable name"
      ? getVariableValue(model as VariableNameBlockModel)
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

export default class Interpreter {
  private variables: VariableMap = new Map();
  private addConsoleText: (type: "in" | "out" | "err", text: string) => void =
    () => {};

  async start(
    addConsoleText: (type: "in" | "out" | "err", text: string) => void,
    clearConsole: () => void,
  ) {
    this.addConsoleText = addConsoleText;
    this.variables = new Map();

    for (const block of store.blocks) {
      let result: string | false;

      switch (block.type) {
        case "variable assign":
          result = this.handleVariableAssign(block);
          break;
        default:
          throw new Error("UNREACHABLE CODE IN Interpreter.start()");
      }

      if (result !== false) {
        clearConsole();
        addConsoleText("err", result);
        return;
      }
    }
  }

  private handleVariableAssign(
    model: VariableAssignBlockModel,
  ): string | false {
    const variable = model.props.variable;

    if (variable.length < 1)
      return "Error: Cannot assign anything to an empty variable.";

    const { error, value } = parseExpression(model, this.variables);
    if (error !== undefined) return error;

    this.variables.set(variable, value);
    this.addConsoleText("in", PythonConverter.toPython.assignment(model));

    // TODO: add read and print statements (only for variables)
    this.addConsoleText("out", `${variable}=${value}`);

    return false;
  }
}
